module KeyboardEvents

import Data.List

import IQuery.Event

%access public

KeyboardEvents : List EventType
KeyboardEvents = [ KeyDown
                 , KeyPress
                 , KeyUp ]

syntax validatedGetter [ts] [r] =
     Event t et
  -> { default tactics { search 30 } prf : Elem t ts }
  -> IO r
  
key : validatedGetter KeyboardEvents (Maybe Key)
key e = map fromKeyCode $ Priv.evProp {fty = FInt} "keyCode" e

altKey : validatedGetter KeyboardEvents Bool
altKey e = Priv.boolProp "altKey" e

ctrlKey : validatedGetter KeyboardEvents Bool
ctrlKey e = Priv.boolProp "ctrlKey" e

metaKey : validatedGetter KeyboardEvents Bool
metaKey e = Priv.boolProp "metaKey" e

shiftKey : validatedGetter KeyboardEvents Bool
shiftKey e = Priv.boolProp "shiftKey" e

onKeyDown : Element et -> (Event KeyDown et -> IO Int) -> IO ()
onKeyDown = Priv.onEvent KeyDown

onKeyPress : Element et -> (Event KeyPress et -> IO Int) -> IO ()
onKeyPress = Priv.onEvent KeyPress

onKeyUp : Element et -> (Event KeyUp et -> IO Int) -> IO ()
onKeyUp = Priv.onEvent KeyUp
