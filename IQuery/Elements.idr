module Elements

import Data.List

%access public

data ElementType : Type where
  Unspecified : ElementType
  Div         : ElementType
  Input       : ElementType
  Text        : ElementType
  Date        : ElementType
  Button      : ElementType

record Property : Type where
  MkProperty : (fty : FTy)
            -> (ty : Type)
            -> (get : (interpFTy fty) -> ty)
            -> (put : ty -> (interpFTy fty))
            -> Property

-- move somewhere else?
toBool : Int -> Bool
toBool 1 = True
toBool _ = False

fromBool : Bool -> Int
fromBool True = 1
fromBool False = 0

private 
simpleProperty : FTy -> Property
simpleProperty fty = MkProperty fty (interpFTy fty) id id

boolProperty : Property
boolProperty = MkProperty FInt Bool toBool fromBool

private   
InputProperties : List (String, Property)
InputProperties = [("disabled", boolProperty)
                  ,("default", simpleProperty FString)
                  ,("autofocus", boolProperty)]

total
elementProperties : ElementType -> List (String, Property)
elementProperties Text = [("autocomplete", simpleProperty FString)]
                      ++ InputProperties

elementProperties Date = [("min", simpleProperty FString)
                         ,("max", simpleProperty FString)]
                      ++ InputProperties 
                      
elementProperties _ = []

data ElemMap : a -> b -> List (a, b) -> Type where 
  First : ElemMap x y ((x, y) :: xs) 
  Later : ElemMap x y xs -> ElemMap x y (p :: xs)

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

setAttributeNS : Element et -> String -> String -> String -> IO ()
setAttributeNS (MkElem e) ns name value =
  mkForeign (
    FFun "%0.setAttributeNS(%1,%2,%3)" [ FPtr
                                       , FString
                                       , FString
                                       , FString
                                       ] FUnit
  ) e ns name value

appendChild : Element a -> Element b -> IO ()
appendChild (MkElem p) (MkElem c) =
  mkForeign (
    FFun "%0.appendChild(%1)" [ FPtr
                              , FPtr
                              ] FUnit
  ) p c
    
getAttribute : Element et -> String -> IO String
getAttribute (MkElem e) name = 
  mkForeign (
    FFun "%0.getAttribute(%1)" [ FPtr
                               , FString
                               ] FString
  ) e name

removeChild : Element et -> Element et -> IO ()
removeChild (MkElem p) (MkElem c) =
  mkForeign (
    FFun "%0.removeChild(%1)" [ FPtr
                              , FPtr
                              ] FUnit
  ) p c

tagName : Element et -> IO String
tagName (MkElem e) = mkForeign (FFun "%0.tagName" [FPtr] FString) e

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

childNodes : Element et -> IO NodeList
childNodes (MkElem e) =
  map MkNodeList $ mkForeign (FFun "%0.childNodes" [FPtr] FPtr) e

interpNN : (nodename : String) -> ElementType
interpNN "div" = Div
interpNN "input" = Input
interpNN _ = Unspecified

newElement : (nn : String) -> IO (Element (interpNN nn))
newElement nn =
  map (Priv.makeElem $ interpNN nn) $ mkForeign (FFun "document.createElement(%0)" [FString] FPtr) nn

newElementNS : String -> String -> IO (Element Unspecified)
newElementNS ns t =
  map (Priv.makeElem Unspecified) $ mkForeign (FFun "document.createElementNS(%0, %1)" [FString, FString] FPtr) ns t
 
getProperty : (name : String)
            -> Element et 
            -> {auto p : ElemMap name prop (elementProperties et)}
            -> IO (Property.ty prop)
getProperty name (MkElem e) {prop} =
  map m $ mkForeign (FFun "%0[%1]" [FPtr, FString] (Property.fty prop)) e name
    where
      m = Property.get prop 
      -- fty = Property.fty prop -- when used above gives 'p does not have a function type'
      
setProperty : (name : String)
           -> Element et
            -> {auto p : ElemMap name prop (elementProperties et)}
           -> (Property.ty prop)
           -> IO ()
setProperty name (MkElem e) {prop} value =
  mkForeign (FFun "%0[%1]=%2" [ FPtr
                     , FString
                     , (Property.fty prop)
                     ] FUnit
  ) e name (m value)
    where
      m = Property.put prop
      
setText : Element et -> String -> IO ()
setText (MkElem e) s =
  mkForeign (FFun "%0.textContent=%1" [FPtr, FString] FUnit) e s

getText : Element et -> IO String
getText (MkElem e) =
  mkForeign (FFun "%0.textContent" [FPtr] FString) e

-- getValue/setValue doesn't use get/setProperty because they apply for all anyway

getValue : Element et -> IO String
getValue (MkElem el) = 
  mkForeign (FFun "%0[%1]" [FPtr, FString] FString) el "value"

setValue : Element et -> String -> IO ()
setValue (MkElem el) v = 
  mkForeign (FFun "%0[%1]=%2" [FPtr, FString, FString] FUnit) el "value" v
