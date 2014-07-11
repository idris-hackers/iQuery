module Event

import Effects
import Effect.StdIO
import IQuery.Key
import IQuery.Element

%access public

abstract
data Event : Type where
  MkEvent : Ptr -> Event
  
public
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

instance Show EventType where
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
evProp : {fty : FTy} -> String -> Event -> IO (interpFTy fty)
evProp {fty} propName (MkEvent e) = mkForeign (
                                      FFun "%0[%1]" [ FPtr, FString ] fty
                                    ) e propName

private
boolProp : String -> Event -> IO Bool
boolProp propName e = map toBool $ evProp {fty = FInt} propName e
  where toBool : Int -> Bool
        toBool 1 = True
        toBool _ = False

key : Event -> IO (Maybe Key)
key e = map fromKeyCode $ evProp {fty = FInt} "keyCode" e

mouseButton : Event -> IO (Maybe MouseButton)
mouseButton e = map fromButtonCode $ evProp {fty = FInt} "button" e

-- clientX : IsMouseEvent e => e -> IO Int
-- clientX = evProp {fty = FInt} "clientX"

-- clientY : IsMouseEvent e => e -> IO Int
-- clientY = evProp {fty = FInt} "clientY"

altKey : Event -> IO Bool
altKey = boolProp "altKey"

ctrlKey : Event -> IO Bool
ctrlKey = boolProp "ctrlKey"

metaKey : Event -> IO Bool
metaKey = boolProp "metaKey"

shiftKey : Event -> IO Bool
shiftKey = boolProp "shiftKey"
 
data EffEvent : Effect where
  Target : { Event } EffEvent Element
 
using (m : Type -> Type)
  instance Handler EffEvent IO where
    handle e Target k = do 
      x <- map mkElem $ evProp {fty = FPtr} "target" e
      k x e
        
EVENT : EFFECT
EVENT = MkEff Event EffEvent

target : { [EVENT] } Eff m Element
target = call $ Target
 
data MouseEvent : Effect where
  ClientX : { Event } MouseEvent Int
     
MOUSEEVENT : EFFECT
MOUSEEVENT = MkEff Event MouseEvent

using (m : Type -> Type)
  instance Handler MouseEvent IO where
    handle e ClientX k = do
      x <- evProp {fty = FInt} "clientX" e
      k x e

clientX : { [MOUSEEVENT] } Eff m Int
clientX = call $ ClientX

onClick : Element -> ({ [STDIO, DOM, EVENT, MOUSEEVENT] } Eff IO Int) -> IO ()
onClick el cb = onEvent "click" el (\e => runInit [(), (), e, e] cb) 
