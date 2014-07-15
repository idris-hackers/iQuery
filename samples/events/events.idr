module Main

import IQuery

first : (et : ElementType) -> NodeList -> IO (Maybe (Element et))
first et = flip (elemAt et) 0

bar : Element Text -> IO Int
bar el = getProperty {et=Text} "disabled" el
  
click : Event Click Text -> IO Int
click e = do
  el <- target e
  -- setAutoFocus el $ not !(getAutoFocus el)
  Elements.setProperty {et=Text} "autofocus" el $ (1 - !(getProperty {et=Text} "autofocus" el))
  setValue el $ (show !(clientX e)) ++ ", " ++ (show !(clientY e))
  pure 1

-- generic handler 
gen : Element Unspecified -> Event t et -> IO Int
gen ul e = do
  -- x <- clientX e -- compile time error
  n <- newElement "li"
  setText n "generic"
  appendChild ul n
  pure 1

mm : Event MouseMove Unspecified -> IO Int
mm e = do
  el <- target e
  x <- clientX e 
  n <- newElement "li"
  setText n $ (show x)
  appendChild !(target e) n
  pure 1
   
-- handle only specified element type
dth : Event et Date -> IO Int
dth e = do
  el <- target e
  Date.setMin el "2012-12-12"
  pure 1
  
main : IO ()
main = do
  Just clickMe <- first Text !(query "#click-me")
  Just list <- first Unspecified !(query "ul#list")
  onClick clickMe click
  onDoubleClick clickMe (gen list)
  Just dt <- first Date !(query "input#dt")
  onClick dt dth
  onMouseMove list mm
  
-- Local Variables:
-- idris-packages: ("effects" "iquery")
-- End:
