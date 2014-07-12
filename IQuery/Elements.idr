module Elements

import Effects
import Effect.StdIO

%access public

data ETy : Type where
  Any : ETy
  Div : ETy
  Input : ETy

abstract
data Element : ETy -> Type where
  MkElem : Ptr -> Element et

-- scope hack
mkElem : (et : ETy) -> Ptr -> Element et
mkElem et p = MkElem p

private
makeElem : (et : ETy) -> Ptr -> (Element et)
makeElem et = MkElem

abstract
data NodeList : Type where
  MkNodeList : Ptr -> NodeList

setProperty : Element et -> String -> String -> IO ()
setProperty (MkElem e) name value =
  mkForeign (
    FFun "%0[%1]=%2" [ FPtr
                     , FString
                     , FString
                     ] FUnit
  ) e name value

getProperty : Element et -> String -> IO String
getProperty (MkElem e) name = 
  mkForeign (
    FFun "%0[%1]" [ FPtr
                  , FString
                  ] FString
  ) e name

setAttribute : Element et -> String -> String -> IO ()
setAttribute (MkElem e) name value =
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

-- getAttribute : Element -> String -> IO String
-- getAttribute (MkElem e) name = 
--   mkForeign (
--     FFun "%0.getAttribute(%1)" [ FPtr
--                                , FString
--                                ] FString
--   ) e name

appendChildIO : Element a -> Element b -> IO ()
appendChildIO (MkElem p) (MkElem c) =
  mkForeign (
    FFun "%0.appendChild(%1)" [ FPtr
                              , FPtr
                              ] FUnit
  ) p c

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

setTextIO : Element et -> String -> IO ()
setTextIO (MkElem e) s =
  mkForeign (FFun "%0.textContent=%1" [FPtr, FString] FUnit) e s

length : NodeList -> IO Int
length (MkNodeList l) =
  mkForeign (FFun "%0.length" [FPtr] FInt) l

elemAt : NodeList -> Int -> IO (Maybe (Element Any))
elemAt (MkNodeList l) i =
  if !(length $ MkNodeList l) > i then
    map (Just . MkElem) $ mkForeign (FFun "%0.item(%1)" [FPtr, FInt] FPtr) l i
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
