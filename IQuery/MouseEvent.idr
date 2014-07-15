module MouseEvent

import Data.List

import IQuery.Event

%access public

MouseEvents : List EventType
MouseEvents = [Click, DoubleClick, MouseDown, MouseMove, MouseOver, MouseOut, MouseUp]

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

private
onMouseEvent : (t : EventType) -> Element et -> (Event t et -> IO Int) -> IO ()
onMouseEvent t = Priv.onEvent (show t)

onClick : Element et -> (Event Click et -> IO Int) -> IO ()
onClick = onMouseEvent Click

onDoubleClick : Element et -> (Event DoubleClick et -> IO Int) -> IO ()
onDoubleClick = onMouseEvent DoubleClick

onMouseDown : Element et -> (Event MouseDown et -> IO Int) -> IO ()
onMouseDown = onMouseEvent MouseDown

onMouseMove : Element et -> (Event MouseMove et -> IO Int) -> IO ()
onMouseMove = onMouseEvent MouseMove

onMouseOver : Element et -> (Event MouseOver et -> IO Int) -> IO ()
onMouseOver = onMouseEvent MouseOver

onMouseOut : Element et -> (Event MouseOut et -> IO Int) -> IO ()
onMouseOut = onMouseEvent MouseOut

onMouseUp : Element et -> (Event MouseUp et -> IO Int) -> IO ()
onMouseUp  = onMouseEvent MouseUp
