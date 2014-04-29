module IQuery

import IQuery.Timeout
import IQuery.Interval
import IQuery.Event
import IQuery.Elements

%access public

alert : String -> IO ()
alert msg =
  mkForeign (FFun "alert(%0)" [FString] FUnit) msg

