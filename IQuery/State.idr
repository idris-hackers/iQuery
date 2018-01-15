module IQuery.State

%access private

public export
data StateTy : Type where
  STInt    : StateTy
  STString : StateTy
  STMaybe  : StateTy -> StateTy
  STList   : StateTy -> StateTy
--  STRecord : List (String,StateTy) -> StateTy
--  STHash   : StateTy -> StateTy

public export
interpSTy : StateTy -> Type
interpSTy STInt       = Int
interpSTy STString    = String
interpSTy (STMaybe a) = Maybe (interpSTy a)
interpSTy (STList  a) = List  (interpSTy a)

export
data State : StateTy -> Type where
  MkState : (t : StateTy) -> Ptr -> State t

export
data StateC : StateTy -> Type where
  MkStateC : Int -> (t : StateTy) -> Ptr -> StateC t

isObj : Ptr -> JS_IO Bool
isObj p = do
  "object" <- foreign FFI_JS "typeof %0" (Ptr -> JS_IO String) p
    | _ => pure False
  pure True

stateVarName : String
stateVarName = "__IDR__IQUERY__STATE__"

stateVarExists : JS_IO Bool
stateVarExists = do
  o <- foreign FFI_JS ("typeof " ++ stateVarName) (JS_IO String)
  pure $ if o == "object" then True else False

initStateVar : JS_IO Ptr
initStateVar =
  foreign FFI_JS (stateVarName ++ " = {count: 0}") (JS_IO Ptr)

getStateVar : JS_IO (Maybe Ptr)
getStateVar = case !stateVarExists of
  True => map Just $ foreign FFI_JS stateVarName (JS_IO Ptr)
  False => pure Nothing

getStateVar' : JS_IO Ptr
getStateVar' = case !getStateVar of
  Just s  => pure s
  Nothing => initStateVar

stateCExists : Ptr -> Int -> JS_IO Bool
stateCExists c n = do
  r <- foreign FFI_JS "typeof %0[%1]" (Ptr -> Int -> JS_IO String) c n
  pure $ if r == "object" then True else False

incCount : Ptr -> JS_IO Int
incCount c = do
  n <- foreign FFI_JS "%0.count" (Ptr -> JS_IO Int) c
  foreign FFI_JS "%0.count++" (Ptr -> JS_IO ()) c
  pure n

infixl 5 =>>
public export
(=>>) : JS_IO (Maybe (State a)) -> (State a -> JS_IO (Maybe b))
                             -> JS_IO (Maybe b)
s =>> f = do
  (Just s') <- s
    | Nothing => pure Nothing
  f s'

infixl 5 :=>
public export
(:=>) : JS_IO (Maybe (State a)) -> (State a -> JS_IO ()) -> JS_IO Bool
(:=>) s f = do
  (Just s') <- s
    | Nothing => pure False
  f s'
  pure True

export
access : Nat -> State (STList t) -> JS_IO (Maybe (State t))
access n (MkState (STList t) p) = do
  r <- foreign FFI_JS "%0.val[%1]" (Ptr -> Int -> JS_IO Ptr)
            p (fromNat n)
  True <- isObj r
    | False => pure Nothing
  pure $ Just $ MkState t r

fromState' : State t -> JS_IO (interpSTy t)
fromState' (MkState STInt       p) = foreign FFI_JS "%0.val" (Ptr -> JS_IO Int) p
fromState' (MkState STString    p) = foreign FFI_JS "%0.val" (Ptr -> JS_IO String) p
fromState' (MkState (STMaybe a) p) = do
  isNull <- foreign FFI_JS "(%0.val == null).toString()" (Ptr -> JS_IO String) p
  case isNull == "true" of
    True  => pure Nothing
    False => pure $ Just !(fromState' (MkState a p))
fromState' (MkState (STList a) p) = do
  n <- foreign FFI_JS "%0.val.length" (Ptr -> JS_IO Int) p
  ps <- sequence $ map
     (foreign FFI_JS "%0.val[%1]" (Ptr -> Int -> JS_IO Ptr) p) [0..(n-1)]
  sequence $ map (\p' => fromState' (MkState a p')) ps

export
fromState : State t -> JS_IO (Maybe (interpSTy t))
fromState (MkState t p) = do
  True <- isObj p
    | False => pure Nothing
  map Just $ fromState' (MkState t p)

export
toState : {t : StateTy} -> interpSTy t -> State t -> JS_IO ()
toState v (MkState STInt p) =
  foreign FFI_JS "%0.val = %1" (Ptr -> Int -> JS_IO ()) p v
toState v (MkState STString p) = do
  foreign FFI_JS "%0.val = %1" (Ptr -> String -> JS_IO ()) p v
toState Nothing (MkState (STMaybe a) p) =
  foreign FFI_JS "%0.val = null" (Ptr -> JS_IO ()) p
toState (Just v) (MkState (STMaybe a) p) = toState v (MkState a p)
toState xs (MkState (STList a) p) = do
  array <- foreign FFI_JS "%0.val = []" (Ptr -> JS_IO Ptr) p
  sequence_ $ map (\x => do
    n <- foreign FFI_JS "%0.push( {} )" (Ptr -> JS_IO Int) array
    box <- foreign FFI_JS "%0[%1]" (Ptr -> Int -> JS_IO Ptr) array (n-1)
    toState x (MkState a box)
    ) xs

export
get : StateC t -> JS_IO (Maybe (State t))
get (MkStateC _ t p) = do
  True <- isObj p
    | False => pure Nothing
  pure $ Just $ MkState t p

export
newState : (t : StateTy) -> interpSTy t -> JS_IO (StateC t)
newState t v = do
  c <- getStateVar'
  n <- incCount c
  p <- foreign FFI_JS "%0[%1] = {}" (Ptr -> Int -> JS_IO Ptr) c n
  toState v (MkState t p)
  pure $ MkStateC n t p

export
destroyState : StateC t -> JS_IO ()
destroyState (MkStateC n _ _) = do
  c <- getStateVar'
  foreign FFI_JS "delete %0[%1]" (Ptr -> Int -> JS_IO ()) c n
