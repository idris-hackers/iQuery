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

onClick : Element et -> (Event Click et -> IO Int) -> IO ()
onClick = Priv.onEvent Click

onDoubleClick : Element et -> (Event DoubleClick et -> IO Int) -> IO ()
onDoubleClick = Priv.onEvent DoubleClick

onMouseDown : Element et -> (Event MouseDown et -> IO Int) -> IO ()
onMouseDown = Priv.onEvent MouseDown

onMouseEnter : Element et -> (Event MouseEnter et -> IO Int) -> IO ()
onMouseEnter = Priv.onEvent MouseEnter

onMouseLeave : Element et -> (Event MouseLeave et -> IO Int) -> IO ()
onMouseLeave = Priv.onEvent MouseLeave

onMouseMove : Element et -> (Event MouseMove et -> IO Int) -> IO ()
onMouseMove = Priv.onEvent MouseMove

onMouseOver : Element et -> (Event MouseOver et -> IO Int) -> IO ()
onMouseOver = Priv.onEvent MouseOver

onMouseOut : Element et -> (Event MouseOut et -> IO Int) -> IO ()
onMouseOut = Priv.onEvent MouseOut

onMouseUp : Element et -> (Event MouseUp et -> IO Int) -> IO ()
onMouseUp  = Priv.onEvent MouseUp
