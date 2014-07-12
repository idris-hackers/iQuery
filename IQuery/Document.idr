module Document

import Effects
import IQuery.Elements 
import IQuery.Event
import IQuery.Input

%access public

interpNN : String -> ETy
interpNN "div" = Div
interpNN "input" = Input
interpNN _ = Any

data EffDom : Effect where
  GetValue    : Element et -> { () } EffDom String
  SetValue    : Element et -> String -> { () } EffDom ()
  NewElement  : (nn : String) -> { () } EffDom (Element (interpNN nn))
  AppendChild : (Element a) -> (Element b) -> { () } EffDom ()
  SetText     : String -> Element et -> { () } EffDom ()
  
private
createElement : (nn : String) -> IO (Element (interpNN nn))
createElement nn =
  map (mkElem $ interpNN nn) $ mkForeign (FFun "document.createElement(%0)" [FString] FPtr) nn

-- newElementNS : (et : ETy) -> String -> (Element et)
-- newElementNS ns t =
--   map mkElem $ mkForeign 
--     (FFun "document.createElementNS(%0, %1)" [FString, FString] FPtr) ns t

instance Handler EffDom IO where
  handle () (GetValue el) k = do
    k !(getProperty el "value") ()
  handle () (SetValue el nv) k = do
    setProperty el "value" nv
    k () () 
  handle () (NewElement nn) k = do
    k !(createElement nn) ()
  handle () (AppendChild a b) k = do
    appendChildIO a b
    k () ()
  handle () (SetText s e) k = do
    setTextIO e s
    k () ()
    
DOM : EFFECT
DOM = MkEff () EffDom

newElement : (nn : String) -> { [DOM] } Eff m (Element (interpNN nn))
newElement nn = call $ NewElement nn

appendChild : Element a -> Element b -> { [DOM] } Eff m ()
appendChild a b = call $ AppendChild a b

setText : String -> Element et -> { [DOM] } Eff m ()
setText s e = call $ SetText s e

getValue : Element et -> { [DOM] } Eff m String
getValue el = call $ GetValue el

setValue : Element et -> String -> { [DOM] } Eff m ()
setValue el v = call $ SetValue el v

onClick : Element et -> ({ [DOM, EVENT et] } Eff IO Int) -> IO ()
onClick el cb = onEvent "click" el (\e => runInit [(), e] cb) 
