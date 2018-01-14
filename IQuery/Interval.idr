module Interval

%access public export

export
data Interval : Type where
  MkInterval : Ptr -> Interval

export
setInterval : (() -> JS_IO ()) -> Double -> JS_IO Interval
setInterval f t = do
  e <- foreign FFI_JS "setInterval(%0,%1)"
          (JsFn (() -> JS_IO ()) -> Double -> JS_IO Ptr) (MkJsFn f) t
  pure (MkInterval e)

clearInterval : Interval -> JS_IO ()
clearInterval (MkInterval p) = foreign FFI_JS "clearInterval(%0)" (Ptr -> JS_IO ()) p
