module Interval

%access public

export
data Interval : Type where
  MkInterval : Ptr -> Interval

setInterval : (() -> IO ()) -> Float -> IO Interval
setInterval f t = do
  e <- mkForeign (
    FFun "setInterval(%0,%1)" [FFunction FUnit (FAny (IO ())), FFloat] FPtr
  ) f t
  return (MkInterval e)

clearInterval : Interval -> IO ()
clearInterval (MkInterval p) =
  mkForeign (FFun "clearInterval(%0)" [FPtr] FUnit) p
