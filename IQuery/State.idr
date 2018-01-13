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

isObj : Ptr -> IO Bool
isObj p = do
  "object" <- mkForeign (FFun "typeof %0" [FPtr] FString) p
    | _ => pure False
  pure True

stateVarName : String
stateVarName = "__IDR__IQUERY__STATE__"

stateVarExists : IO Bool
stateVarExists = do
  o <- mkForeign (FFun ("typeof " ++ stateVarName) [] FString)
  pure $ if o == "object" then True else False

initStateVar : IO Ptr
initStateVar = mkForeign (FFun (stateVarName ++ " = {count: 0}") [] FPtr)

getStateVar : IO (Maybe Ptr)
getStateVar = case !stateVarExists of
  True  => map Just $ mkForeign (FFun stateVarName [] FPtr)
  False => pure Nothing

getStateVar' : IO Ptr
getStateVar' = case !getStateVar of
  Just s  => pure s
  Nothing => initStateVar

stateCExists : Ptr -> Int -> IO Bool
stateCExists c n = do
  r <- mkForeign (FFun "typeof %0[%1]" [FPtr,FInt] FString) c n
  pure $ if r == "object" then True else False

incCount : Ptr -> IO Int
incCount c = do
  n <- mkForeign (FFun "%0.count" [FPtr] FInt) c
  mkForeign (FFun "%0.count++" [FPtr] FUnit) c
  pure n

infixl 5 =>>
public export
(=>>) : IO (Maybe (State a)) -> (State a -> IO (Maybe b))
                             -> IO (Maybe b)
s =>> f = do
  (Just s') <- s
    | Nothing => pure Nothing
  f s'

infixl 5 :=>
public export
(:=>) : IO (Maybe (State a)) -> (State a -> IO ()) -> IO Bool
(:=>) s f = do
  (Just s') <- s
    | Nothing => pure False
  f s'
  pure True

public export
access : Nat -> State (STList t) -> IO (Maybe (State t))
access n (MkState (STList t) p) = do
  r <- mkForeign (FFun "%0.val[%1]" [FPtr,FInt] FPtr) p (fromNat n)
  True <- isObj r
    | False => pure Nothing
  pure $ Just $ MkState t r

fromState' : State t -> IO (interpSTy t)
fromState' (MkState STInt       p) = mkForeign (FFun "%0.val" [FPtr] FInt) p
fromState' (MkState STString    p) = mkForeign (FFun "%0.val" [FPtr] FString) p
fromState' (MkState (STMaybe a) p) = do
  isNull <- (mkForeign (FFun "(%0.val == null).toString()" [FPtr] FString) p)
  case isNull == "true" of
    True  => pure Nothing
    False => pure $ Just !(fromState' (MkState a p))
fromState' (MkState (STList a) p) = do
  n <- mkForeign (FFun "%0.val.length" [FPtr] FInt) p
  ps <- sequence $ map
     (\n => mkForeign (FFun "%0.val[%1]" [FPtr,FInt] FPtr) p n) [0..(n-1)]
  sequence $ map (\p' => fromState' (MkState a p')) ps

public export
fromState : State t -> IO (Maybe (interpSTy t))
fromState (MkState t p) = do
  True <- isObj p
    | False => pure Nothing
  map Just $ fromState' (MkState t p)

public export
toState : {t : StateTy} -> interpSTy t -> State t -> IO ()
toState v (MkState STInt p) =
  mkForeign (FFun "%0.val = %1" [FPtr, FInt] FUnit) p v
toState v (MkState STString p) = do
  mkForeign (FFun "%0.val = %1" [FPtr, FString] FUnit) p v
toState Nothing (MkState (STMaybe a) p) =
  mkForeign (FFun "%0.val = null" [FPtr] FUnit) p
toState (Just v) (MkState (STMaybe a) p) = toState v (MkState a p)
toState xs (MkState (STList a) p) = do
  array <- mkForeign (FFun "%0.val = []" [FPtr] FPtr) p
  sequence_ $ map (\x => do
    n <- mkForeign (FFun "%0.push( {} )" [FPtr] FInt) array
    box <- mkForeign (FFun "%0[%1]" [FPtr, FInt] FPtr) array (n-1)
    toState x (MkState a box)
    ) xs

public export
get : StateC t -> IO (Maybe (State t))
get (MkStateC _ t p) = do
  True <- isObj p
    | False => pure Nothing
  pure $ Just $ MkState t p

public export
newState : (t : StateTy) -> interpSTy t -> IO (StateC t)
newState t v = do
  c <- getStateVar'
  n <- incCount c
  p <- mkForeign (FFun "%0[%1] = {}" [FPtr,FInt] FPtr) c n
  toState v (MkState t p)
  pure $ MkStateC n t p

public export
destroyState : StateC t -> IO ()
destroyState (MkStateC n _ _) = do
  c <- getStateVar'
  mkForeign (FFun "delete %0[%1]" [FPtr,FInt] FUnit) c n
