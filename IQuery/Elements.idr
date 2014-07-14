module Elements

%access public

data ElementType : Type where
  Unspecified : ElementType
  Div         : ElementType
  Input       : ElementType
  Text        : ElementType
  Date        : ElementType
  Button      : ElementType
  
abstract
data Element : ElementType -> Type where
  MkElem : Ptr -> Element et

abstract
data NodeList : Type where
  MkNodeList : Ptr -> NodeList

-- should be somehow 'package private'
namespace Priv
  makeElem : (et : ElementType) -> Ptr -> Element et
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

  onEvent : String -> Element et -> (e -> IO Int) -> IO ()
  onEvent {e} ev (MkElem el) cb =
     mkForeign (
        FFun "%0.addEventListener(%1, %2)" [ FPtr
                                           , FString
                                           , FFunction (FAny e) (FAny (IO Int))
                                           ] FUnit
      ) el ev cb

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

length : NodeList -> IO Int
length (MkNodeList l) =
  mkForeign (FFun "%0.length" [FPtr] FInt) l

elemAt : (et : ElementType) -> NodeList -> Int -> IO (Maybe (Element et))
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

interpNN : (nodename : String) -> ElementType
interpNN "div" = Div
interpNN "input" = Input
interpNN _ = Unspecified

newElement : (nn : String) -> IO (Element (interpNN nn))
newElement nn =
  map (Priv.makeElem $ interpNN nn) $ mkForeign (FFun "document.createElement(%0)" [FString] FPtr) nn

-- newElementNS : (et : ElementType) -> String -> (Element et)
-- newElementNS ns t =
--   map mkElem $ mkForeign 
--     (FFun "document.createElementNS(%0, %1)" [FString, FString] FPtr) ns t
 
setText : Element et -> String -> IO ()
setText (MkElem e) s =
  mkForeign (FFun "%0.textContent=%1" [FPtr, FString] FUnit) e s

getText : Element et -> IO String
getText (MkElem e) =
  mkForeign (FFun "%0.textContent" [FPtr] FString) e

getValue : Element et -> IO String
getValue = Priv.getProperty "value"

setValue : Element et -> String -> IO ()
setValue = Priv.setProperty "value"
