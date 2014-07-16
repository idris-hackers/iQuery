module MouseEvents

import Data.List

import IQuery.Event

%access public

MouseEvents : List EventType
MouseEvents = [ Click
              , DoubleClick
              , MouseDown
              , MouseMove
              , MouseEnter
              , MouseLeave
              , MouseOver
              , MouseOut
              , MouseUp]

syntax validatedGetter [ts] [r] =
     Event t et
  -> { default tactics { search 30 } prf : Elem t ts }
  -> IO r
  
clientX : validatedGetter MouseEvents Int
clientX e = Priv.evProp {fty=FInt} "clientX" e

clientY : validatedGetter MouseEvents Int
clientY e = Priv.evProp {fty=FInt} "clientY" e

screenX : validatedGetter MouseEvents Int
screenX e = Priv.evProp {fty=FInt} "screenX" e

screenY : validatedGetter MouseEvents Int
screenY e = Priv.evProp {fty=FInt} "screenY" e

mouseButton : validatedGetter MouseEvents (Maybe MouseButton)
mouseButton e = map fromButtonCode $ Priv.evProp {fty=FInt} "button" e
