module IQuery

import public IQuery.Timeout
import public IQuery.Interval
import public IQuery.Event
import public IQuery.Elements
import public IQuery.State
%access public export

alert : String -> JS_IO ()
alert msg = foreign FFI_JS "alert(%0)" (String -> JS_IO ()) msg
