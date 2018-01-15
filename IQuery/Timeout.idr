module IQuery.Timeout

%access export

export
data Timeout : Type where
  MkTimeout : Ptr -> Timeout

setTimeout : (() -> JS_IO ()) -> Double -> JS_IO Timeout
setTimeout f t = do
  e <- foreign FFI_JS "setTimeout(%0,%1)"
    (JsFn (() -> JS_IO ()) -> Double -> JS_IO Ptr) (MkJsFn f) t
  pure (MkTimeout e)

clearTimeout : Timeout -> JS_IO ()
clearTimeout (MkTimeout p) =
  foreign FFI_JS "clearTimeout(%0)" (Ptr -> JS_IO ()) p
