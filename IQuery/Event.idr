module Event

import Data.List

import Effects
import Effect.StdIO

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

MouseEvents : List EventType
MouseEvents = [Click, DoubleClick, MouseDown, MouseMove, MouseOver, MouseOut, MouseUp]

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
data Event : EventType -> ETy -> Type where
  MkEvent : Ptr -> Event t et

namespace Priv
    evProp : {fty : FTy} -> String -> Event t et -> IO (interpFTy fty)
    evProp {fty} propName (MkEvent e) = mkForeign (
                                      FFun "%0[%1]" [ FPtr, FString ] fty
                                    ) e propName

private
boolProp : String -> Event t et -> IO Bool
boolProp propName e = map toBool $ evProp {fty = FInt} propName e
  where toBool : Int -> Bool
        toBool 1 = True
        toBool _ = False

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

data EffEvent : Effect where
  Target        : (et : ETy) -> { Event t et } EffEvent (Element et)
  EventProperty : (ft : FTy) -> String -> { Event t et } EffEvent (interpFTy ft)
  
using (m : Type -> Type)
  instance Handler EffEvent IO where
    handle e (Target et) k = do 
      x <- map (Priv.makeElem et) $ evProp {fty = FPtr} "target" e
      k x e
    handle e (EventProperty ft prop) k = do
      x <- evProp {fty = ft} prop e
      k x e
      
EVENT : EventType -> ETy -> EFFECT
EVENT t et = MkEff (Event t et) EffEvent

target : {et : ETy} -> { [EVENT t et] } Eff m (Element et)
target {et} = call $ Target et

clientX : { default tactics { search 30 } correctEvent : Elem t MouseEvents }
  -> { [EVENT t et] } Eff m Int
clientX = call $ EventProperty FInt "clientX"

-- mouseButton : Event et -> IO (Maybe MouseButton)
-- mouseButton e = map fromButtonCode $ evProp {fty = FInt} "button" e

-- clientX : IsMouseEvent e => e -> IO Int
-- clientX = evProp {fty = FInt} "clientX"

-- clientY : IsMouseEvent e => e -> IO Int
-- clientY = evProp {fty = FInt} "clientY"

onClick : Element et -> ({ [DOM, EVENT Click et] } Eff IO Int) -> IO ()
onClick el cb = onEvent "click" el (\e => runInit [(), e] cb) 
