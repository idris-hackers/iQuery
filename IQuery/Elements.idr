module Elements

import IQuery.Event

%access public export

export
data Element : Type where
  MkElem : Ptr -> Element

export
data NodeList : Type where
  MkNodeList : Ptr -> NodeList

newElement : String -> IO Element
newElement t =
  map MkElem $ mkForeign (FFun "document.createElement(%0)" [FString] FPtr) t

newElementNS : String -> String -> IO Element
newElementNS ns t =
  map MkElem $ mkForeign
    (FFun "document.createElementNS(%0, %1)" [FString, FString] FPtr) ns t

setProperty : Element -> String -> String -> IO ()
setProperty (MkElem e) name value =
  mkForeign (
    FFun "%0[%1]=%2" [ FPtr
                     , FString
                     , FString
                     ] FUnit
  ) e name value

getProperty : Element -> String -> IO String
getProperty (MkElem e) name =
  mkForeign (
    FFun "%0[%1]" [ FPtr
                  , FString
                  ] FString
  ) e name

setValue : Element -> String -> IO ()
setValue = flip setProperty "value"

getValue : Element -> IO String
getValue = flip getProperty "value"

setAttribute : Element -> String -> String -> IO ()
setAttribute (MkElem e) name value =
  mkForeign (
    FFun "%0.setAttribute(%1,%2)" [ FPtr
                                  , FString
                                  , FString
                                  ] FUnit
  ) e name value

setAttributeNS : Element -> String -> String -> String -> IO ()
setAttributeNS (MkElem e) ns name value =
  mkForeign (
    FFun "%0.setAttributeNS(%1,%2,%3)" [ FPtr
                                       , FString
                                       , FString
                                       , FString
                                       ] FUnit
  ) e ns name value

getAttribute : Element -> String -> IO String
getAttribute (MkElem e) name =
  mkForeign (
    FFun "%0.getAttribute(%1)" [ FPtr
                               , FString
                               ] FString
  ) e name

appendChild : Element -> Element -> IO ()
appendChild (MkElem p) (MkElem c) =
  mkForeign (
    FFun "%0.appendChild(%1)" [ FPtr
                              , FPtr
                              ] FUnit
  ) p c

removeChild : Element -> Element -> IO ()
removeChild (MkElem p) (MkElem c) =
  mkForeign (
    FFun "%0.removeChild(%1)" [ FPtr
                              , FPtr
                              ] FUnit
  ) p c

tagName : Element -> IO String
tagName (MkElem e) = mkForeign (FFun "%0.tagName" [FPtr] FString) e

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
length (MkNodeList l) =
  mkForeign (FFun "%0.length" [FPtr] FInt) l

elemAt : NodeList -> Int -> IO (Maybe Element)
elemAt (MkNodeList l) i =
  if !(length $ MkNodeList l) > i then
    map (Just . MkElem) $ mkForeign (FFun "%0.item(%1)" [FPtr, FInt] FPtr) l i
  else
    return Nothing

query : String -> IO NodeList
query q =
  map MkNodeList $ mkForeign (FFun "document.querySelectorAll(%0)" [FString] FPtr) q

childNodes : Element -> IO NodeList
childNodes (MkElem e) =
  map MkNodeList $ mkForeign (FFun "%0.childNodes" [FPtr] FPtr) e
