module Elements

import Effects
import Effect.StdIO

%access public

data ETy : Type where
  BaseElement : ETy
  Div : ETy
  Input : ETy
  Text : ETy
  Date : ETy
  Button : ETy
  
abstract
data Element : ETy -> Type where
  MkElem : Ptr -> Element et

abstract
data NodeList : Type where
  MkNodeList : Ptr -> NodeList

-- should be somehow 'package private'
namespace Priv
  makeElem : (et : ETy) -> Ptr -> Element et
  makeElem _ = MkElem
  
  setProperty : String -> Element et -> String -> IO ()
  setProperty name (MkElem e) value =
    mkForeign (
      FFun "%0[%1]=%2" [ FPtr
                       , FString
                       , FString
                       ] FUnit
    ) e name value

  getProperty : String -> Element et -> IO String
  getProperty name (MkElem e) = 
    mkForeign (
      FFun "%0[%1]" [ FPtr
                    , FString
                    ] FString
    ) e name

  setAttribute : String -> Element et -> String -> IO ()
  setAttribute name (MkElem e) value =
    mkForeign (
      FFun "%0.setAttribute(%1,%2)" [ FPtr
                                    , FString
                                    , FString
                                    ] FUnit
    ) e name value

-- setAttributeNS : Element -> String -> String -> String -> IO ()
-- setAttributeNS (MkElem e) ns name value =
--   mkForeign (
--     FFun "%0.setAttributeNS(%1,%2,%3)" [ FPtr
--                                        , FString
--                                        , FString
--                                        , FString
--                                        ] FUnit
--   ) e ns name value

  appendChild : Element a -> Element b -> IO ()
  appendChild (MkElem p) (MkElem c) =
    mkForeign (
      FFun "%0.appendChild(%1)" [ FPtr
                                , FPtr
                                ] FUnit
    ) p c
    
-- getAttribute : Element -> String -> IO String
-- getAttribute (MkElem e) name = 
--   mkForeign (
--     FFun "%0.getAttribute(%1)" [ FPtr
--                                , FString
--                                ] FString
--   ) e name

-- removeChild : Element -> Element -> IO ()
-- removeChild (MkElem p) (MkElem c) =
--   mkForeign (
--     FFun "%0.removeChild(%1)" [ FPtr
--                               , FPtr
--                               ] FUnit
--   ) p c

-- tagName : Element -> IO String
-- tagName (MkElem e) = mkForeign (FFun "%0.tagName" [FPtr] FString) e

-- getText : Element -> IO String
-- getText (MkElem e) =
--   mkForeign (FFun "%0.textContent" [FPtr] FString) e

  setText : Element et -> String -> IO ()
  setText (MkElem e) s =
    mkForeign (FFun "%0.textContent=%1" [FPtr, FString] FUnit) e s

length : NodeList -> IO Int
length (MkNodeList l) =
  mkForeign (FFun "%0.length" [FPtr] FInt) l

elemAt : (et : ETy) -> NodeList -> Int -> IO (Maybe (Element et))
elemAt et (MkNodeList l) i =
  if !(length $ MkNodeList l) > i then
    map (Just . makeElem et) $ mkForeign (FFun "%0.item(%1)" [FPtr, FInt] FPtr) l i
  else
    return Nothing

query : String -> IO NodeList
query q =
  map MkNodeList $ mkForeign (FFun "document.querySelectorAll(%0)" [FString] FPtr) q

-- childNodes : Element -> IO NodeList
-- childNodes (MkElem e) =
--   map MkNodeList $ mkForeign (FFun "%0.childNodes" [FPtr] FPtr) e

onEvent : String -> Element et -> (e -> IO Int) -> IO ()
onEvent {e} ev (MkElem el) cb =
    mkForeign (
      FFun "%0.addEventListener(%1, %2)" [ FPtr
                                         , FString
                                         , FFunction (FAny e) (FAny (IO Int))
                                         ] FUnit
    ) el ev cb

interpNN : (nodename : String) -> ETy
interpNN "div" = Div
interpNN "input" = Input
interpNN _ = BaseElement

data EffDom : Effect where
  GetProperty  : String -> Element et -> { () } EffDom String
  SetProperty  : String -> Element et -> String -> { () } EffDom ()
  NewElement  : (nn : String) -> { () } EffDom (Element (interpNN nn))
  AppendChild : (Element a) -> (Element b) -> { () } EffDom ()
  SetText     : Element et -> String -> { () } EffDom ()
  
private
createElement : (nn : String) -> IO (Element (interpNN nn))
createElement nn =
  map (Priv.makeElem $ interpNN nn) $ mkForeign (FFun "document.createElement(%0)" [FString] FPtr) nn

-- newElementNS : (et : ETy) -> String -> (Element et)
-- newElementNS ns t =
--   map mkElem $ mkForeign 
--     (FFun "document.createElementNS(%0, %1)" [FString, FString] FPtr) ns t

instance Handler EffDom IO where
  handle () (GetProperty prop el) k = do
    k !(Priv.getProperty prop el) ()
  handle () (SetProperty prop el nv) k = do
    Priv.setProperty prop el nv
    k () () 
  handle () (NewElement nn) k = do
    k !(createElement nn) ()
  handle () (AppendChild a b) k = do
    Priv.appendChild a b
    k () ()
  handle () (SetText e s) k = do
    Priv.setText e s
    k () ()
    
DOM : EFFECT
DOM = MkEff () EffDom

newElement : (nn : String) -> { [DOM] } Eff m (Element (interpNN nn))
newElement nn = call $ NewElement nn

appendChild : Element a -> Element b -> { [DOM] } Eff m ()
appendChild a b = call $ AppendChild a b

setText : String -> Element et -> { [DOM] } Eff m ()
setText s e = call $ SetProperty "text" e s

getValue : Element et -> { [DOM] } Eff m String
getValue el = call $ GetProperty "value" el

setValue : String -> Element et -> { [DOM] } Eff m ()
setValue v el = call $ SetProperty "value" el v
