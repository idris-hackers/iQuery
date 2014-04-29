module Timeout

%access public

abstract
data Timeout : Type where
  MkTimeout : Ptr -> Timeout

setTimeout : (() -> IO ()) -> Float -> IO Timeout
setTimeout f t = do
  e <- mkForeign (
    FFun "setTimeout(%0,%1)" [FFunction FUnit (FAny (IO ())), FFloat] FPtr
  ) f t
  return (MkTimeout e)

clearTimeout : Timeout -> IO ()
clearTimeout (MkTimeout p) =
  mkForeign (FFun "clearTimeout(%0)" [FPtr] FUnit) p

