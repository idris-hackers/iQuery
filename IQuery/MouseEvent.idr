module MouseEvent

import Data.List
import Effects

import IQuery.Event

%access public

MouseEvents : List EventType
MouseEvents = [Click, DoubleClick, MouseDown, MouseMove, MouseOver, MouseOut, MouseUp]

clientX : { default tactics { search 30 } correctEvent : Elem t MouseEvents }
       -> { [EVENT t et] } Eff m Int
clientX = call $ EventProperty FInt "clientX"

clientY : { default tactics { search 30 } correctEvent : Elem t MouseEvents }
       -> { [EVENT t et] } Eff m Int
clientY = call $ EventProperty FInt "clientY"

mouseButton : { default tactics { search 30 } correctEvent : Elem t MouseEvents }
           -> { [EVENT t et] } Eff m (Maybe MouseButton)
mouseButton = do
  bc <- call $ EventProperty FInt "button"
  pure $ fromButtonCode bc

private
onMouseEvent : (t : EventType) -> Element et -> (({ [DOM, EVENT t et] } Eff IO Int)) -> IO ()
onMouseEvent t el cb = onEvent (show t) el (\e => runInit [(), e] cb) 

onClick : Element et -> ({ [DOM, EVENT Click et] } Eff IO Int) -> IO ()
onClick = onMouseEvent Click

onDoubleClick : Element et -> ({ [DOM, EVENT DoubleClick et] } Eff IO Int) -> IO ()
onDoubleClick = onMouseEvent DoubleClick

onMouseDown : Element et -> ({ [DOM, EVENT MouseDown et] } Eff IO Int) -> IO ()
onMouseDown = onMouseEvent MouseDown

onMouseMove : Element et -> ({ [DOM, EVENT MouseMove et] } Eff IO Int) -> IO ()
onMouseMove = onMouseEvent MouseMove

onMouseOver : Element et -> ({ [DOM, EVENT MouseOver et] } Eff IO Int) -> IO ()
onMouseOver = onMouseEvent MouseOver

onMouseOut : Element et -> ({ [DOM, EVENT MouseOut et] } Eff IO Int) -> IO ()
onMouseOut = onMouseEvent MouseOut

onMouseUp : Element et -> ({ [DOM, EVENT MouseUp et] } Eff IO Int) -> IO ()
onMouseUp  = onMouseEvent MouseUp
