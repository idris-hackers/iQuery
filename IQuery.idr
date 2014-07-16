module IQuery

import IQuery.Timeout
import IQuery.Interval
import IQuery.Elements
import IQuery.Event
import IQuery.MouseEvents
import IQuery.KeyboardEvents
import IQuery.Document

%access public

alert : String -> IO ()
alert msg =
  mkForeign (FFun "alert(%0)" [FString] FUnit) msg
