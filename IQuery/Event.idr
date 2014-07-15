module Event

import Data.List

import IQuery.Key
import IQuery.Elements
import IQuery.Input

%access public
 
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

abstract
data Event : EventType -> ElementType -> Type where
  MkEvent : Ptr -> Event t et

namespace Priv
    evProp : {fty : FTy} -> String -> Event t et -> IO (interpFTy fty)
    evProp {fty} propName (MkEvent e) = mkForeign (
                                      FFun "%0[%1]" [ FPtr, FString ] fty
                                    ) e propName

private
boolProp : String -> Event t et -> IO Bool
boolProp propName e = map toBool $ evProp {fty = FInt} propName e

key : Event t et -> IO (Maybe Key)
key e = map fromKeyCode $ evProp {fty = FInt} "keyCode" e

-- altKey : Event -> IO Bool
-- altKey = boolProp "altKey"

-- ctrlKey : Event -> IO Bool
-- ctrlKey = boolProp "ctrlKey"

-- metaKey : Event -> IO Bool
-- metaKey = boolProp "metaKey"

-- shiftKey : Event -> IO Bool
-- shiftKey = boolProp "shiftKey"

target : Event t et -> IO (Element et)
target e = map (Priv.makeElem et) $ evProp {fty = FPtr} "target" e

