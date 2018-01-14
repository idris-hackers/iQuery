module Event

import IQuery.Key

%access export

export
data Event : Type where
  MkEvent : Ptr -> Event

public export
data EventType : Type where
  Click : EventType
  DoubleClick : EventType
  MouseDown : EventType
  MouseMove : EventType
  MouseOver : EventType
  MouseOut : EventType
  MouseUp : EventType
  KeyDown : EventType
  KeyUp : EventType
  KeyPress : EventType
  Abort : EventType
  Error : EventType
  Load : EventType
  Resize : EventType
  Scroll : EventType
  Unload : EventType
  Blur : EventType
  Change : EventType
  Focus : EventType
  Reset : EventType
  Select : EventType
  Submit : EventType

Show EventType where
  show Click = "click"
  show DoubleClick = "dblclick"
  show MouseDown = "mousedown"
  show MouseMove = "mousemove"
  show MouseOver = "mouseover"
  show MouseOut = "mouseout"
  show MouseUp = "mouseup"
  show KeyDown = "keydown"
  show KeyUp = "keyup"
  show KeyPress = "keypress"
  show Abort = "abort"
  show Error = "error"
  show Load = "load"
  show Resize = "resize"
  show Scroll = "scroll"
  show Unload = "unload"
  show Blur = "blur"
  show Change = "change"
  show Focus = "focus"
  show Reset = "reset"
  show Select = "select"
  show Submit = "submit"

private
evProp : {ty : Type} -> {auto fty : FTy FFI_JS [] (Ptr -> String -> JS_IO ty)} ->
         String -> Event -> JS_IO ty
evProp {ty} {fty} propName (MkEvent e) =
  foreign FFI_JS "%0[%1]" (Ptr -> String -> JS_IO ty) e propName

private
boolProp : String -> Event -> JS_IO Bool
boolProp propName e = map toBool $ evProp {ty = Int} propName e
  where toBool : Int -> Bool
        toBool 1 = True
        toBool _ = False

key : Event -> JS_IO (Maybe Key)
key e = map fromKeyCode $ evProp {ty = Int} "keyCode" e

mouseButton : Event -> JS_IO (Maybe MouseButton)
mouseButton e = map fromButtonCode $ evProp {ty = Int} "button" e

clientX : Event -> JS_IO Int
clientX = evProp {ty = Int} "clientX"

clientY : Event -> JS_IO Int
clientY = evProp {ty = Int} "clientY"

altKey : Event -> JS_IO Bool
altKey = boolProp "altKey"

ctrlKey : Event -> JS_IO Bool
ctrlKey = boolProp "ctrlKey"

metaKey : Event -> JS_IO Bool
metaKey = boolProp "metaKey"

shiftKey : Event -> JS_IO Bool
shiftKey = boolProp "shiftKey"

execCallback : (Event -> JS_IO Int) -> Ptr -> JS_IO Int
execCallback cb = cb . MkEvent
