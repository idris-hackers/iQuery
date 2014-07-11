module Element

import Effects
import Effect.StdIO

%access public

abstract
data Element : Type where
  MkElem : Ptr -> Element

-- scope hack
mkElem : Ptr -> Element
mkElem = MkElem

abstract
data NodeList : Type where
  MkNodeList : Ptr -> NodeList

newElement : String -> IO Element
newElement t =
  map MkElem $ mkForeign (FFun "document.createElement(%0)" [FString] FPtr) t

newElementNS : String -> String -> IO Element
newElementNS ns t =
  map MkElem $ mkForeign 
    (FFun "document.createElementNS(%0, %1)" [FString, FString] FPtr) ns t

private
setProperty : Element -> String -> String -> IO ()
setProperty (MkElem e) name value =
  mkForeign (
    FFun "%0[%1]=%2" [ FPtr
                     , FString
                     , FString
                     ] FUnit
  ) e name value

private
getProperty : Element -> String -> IO String
getProperty (MkElem e) name = 
  mkForeign (
    FFun "%0[%1]" [ FPtr
                  , FString
                  ] FString
  ) e name

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

data EffDom : Effect where
  GetValue : Element -> { () } EffDom String
  SetValue : Element -> String -> { () } EffDom ()
 
using (m : Type -> Type)
  instance Handler EffDom IO where
    handle () (GetValue el) k = do
      k !(getProperty el "value") ()
    handle () (SetValue el nv) k = do
      setProperty el "value" nv
      k () ()
     
DOM : EFFECT
DOM = MkEff () EffDom

getValue : Element -> { [DOM] } Eff m String
getValue el = call $ GetValue el

setValue : Element -> String -> { [DOM] } Eff m ()
setValue el v = call $ SetValue el v

onEvent : String -> Element -> (e -> IO Int) -> IO ()
onEvent {e} ev (MkElem el) cb =
    mkForeign (
      FFun "%0.addEventListener(%1, %2)" [ FPtr
                                         , FString
                                         , FFunction (FAny e) (FAny (IO Int))
                                         ] FUnit
    ) el ev cb
