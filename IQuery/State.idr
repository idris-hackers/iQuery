module IQuery.State

%access private

public
data StateTy = SInt | SString 

public 
interpSTy : StateTy -> Type
interpSTy SInt    = Int
interpSTy SString = String

sTytoFTy : StateTy -> FTy
sTytoFTy SInt    = FInt
sTytoFTy SString = FString

total
lemmaTy : (t : StateTy) -> interpFTy (sTytoFTy t) = interpSTy t
lemmaTy SInt    = refl
lemmaTy SString = refl

data StateC : Type where
  MkStateC : Ptr -> StateC

abstract
data State : StateTy -> Type where
  MkState : Int -> Ptr -> (t : StateTy) -> State t

stateVarName : String
stateVarName = "__IDR__IQUERY__STATE__"

stateCExists : IO Bool
stateCExists = do
  o <- mkForeign (FFun ("typeof " ++ stateVarName) [] FString) 
  pure $ if o == "object" then True else False

initStateC : IO StateC
initStateC = do
  s <- mkForeign (FFun (stateVarName ++ " = {count: 0}") [] FPtr)
  pure $ MkStateC s

getStateC : IO (Maybe StateC) 
getStateC = case !stateCExists of
  True  => do
    c <- mkForeign (FFun stateVarName [] FPtr)
    pure $ Just $ MkStateC c
  False => pure Nothing

getStateC' : IO StateC
getStateC' = case !getStateC of
  Just s  => pure s
  Nothing => initStateC

stateExists : Ptr -> Int -> IO Bool
stateExists c n = do
  r <- mkForeign (FFun "typeof %0[%1]" [FPtr,FInt] FString) c n
  pure $ if r == "undefined" then False else True

incCount : Ptr -> IO Int
incCount c = do
  n <- mkForeign (FFun "%0.count" [FPtr] FInt) c
  mkForeign (FFun "%0.count++" [FPtr] FUnit) c
  pure n

public 
get : State t -> IO (Maybe (interpSTy t))
get (MkState n c t) = do
  True <- stateExists c n
    | False => pure Nothing
  v <- mkForeign (FFun "%0[%1]" [FPtr,FInt] (sTytoFTy t)) c n
  pure $ Just $ rewrite (sym (lemmaTy t)) in v

public
put : State t -> interpSTy t -> IO Bool
put (MkState n c t) v = do
  True <- stateExists c n
    | False => pure False 
  mkForeign (FFun "%0[%1] = %2" [FPtr,FInt,sTytoFTy t] FUnit) c n 
    (rewrite (lemmaTy t) in v)
  pure True

public
newState : (t : StateTy) -> interpSTy t -> IO (State t)
newState t v = do
  (MkStateC c) <- getStateC'
  n <- incCount c
  mkForeign (FFun "%0[%1] = %2" [FPtr, FInt, sTytoFTy t] FUnit) c n
    (rewrite (lemmaTy t) in v)
  pure $ MkState n c t

public
destroyState : State t -> IO ()
destroyState (MkState n c t) = do
  mkForeign (FFun "delete %0[%1]" [FPtr,FInt] FUnit) c n
