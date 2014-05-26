module Elements

import IQuery.Event

%access public

abstract
data Element : Type where
  MkElem : Ptr -> Element

abstract
data NodeList : Type where
  MkNodeList : Ptr -> NodeList

getText : Element -> IO String
getText (MkElem e) =
  mkForeign (FFun "%0.textContent" [FPtr] FString) e

setText : Element -> String -> IO ()
setText (MkElem e) s =
  mkForeign (FFun "%0.textContent=%1" [FPtr, FString] FUnit) e s

onEvent : EventType -> Element -> (Event -> IO Int) -> IO ()
onEvent ty (MkElem e) cb =
  let ev = show ty in
      mkForeign (
        FFun "%0.addEventListener(%1, %2)" [ FPtr
                                           , FString
                                           , FFunction (FAny Event) (FAny (IO Int))
                                           ] FUnit
      ) e ev cb

onClick : Element -> (Event -> IO Int) -> IO ()
onClick = onEvent Click

length : NodeList -> IO Int
length (MkNodeList l) = do
  len <- mkForeign (FFun "%0.length" [FPtr] FInt) l
  return len

elemAt : NodeList -> Int -> IO (Maybe Element)
elemAt (MkNodeList l) i = do
  len <- length (MkNodeList l)
  if len > i
     then do
       e <- mkForeign (FFun "%0.item(%1)" [FPtr, FInt] FPtr) l i
       return $ Just (MkElem e)
     else return Nothing

query : String -> IO NodeList
query q = do
  e <- mkForeign (FFun "document.querySelectorAll(%0)" [FString] FPtr) q
  return (MkNodeList e)

