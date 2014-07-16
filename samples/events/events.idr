module Main

import IQuery

first : (et : ElementType) -> NodeList -> IO (Maybe (Element et))
first et = flip (elemAt et) 0

click : Event Click "input" -> IO Int
click e = do
  el <- target e
  setProperty "autofocus" el $ not !(getProperty "autofocus" el)
  setValue el $ (show !(clientX e)) ++ ", " ++ (show !(clientY e))
  pure 1

-- generic handler 
gen : Element "element" -> Event t "element" -> IO Int
gen ul e = do
  -- x <- clientX e -- compile time error
  n <- newElement "li"
  setText n "generic"
  setProperty "title" ul "woosh"
  appendChild ul n
  pure 1

mm : Event MouseMove "element" -> IO Int
mm e = do
  el <- target e
  x <- clientX e 
  n <- newElement "li"
  setText n $ (show x)
  appendChild !(target e) n
  pure 1
  
-- handle only specified element type
dth : Event et "input" -> IO Int
dth e = do
  el <- target e
  setProperty "min" el "2012-12-12"
  pure 1
 
onk : Event KeyDown "element" -> IO Int
onk e = do
  Just elShift <- first "span" !(query "span#shift")
  Just elCtrl <- first "span" !(query "span#ctrl")
  Just elAlt <- first "span" !(query "span#alt")
  
  setText elShift $ show !(shiftKey e)
  setText elCtrl $ show !(ctrlKey e)
  setText elAlt $ show !(altKey e)
  
  pure 1

main : IO ()
main = do
  Just clickMe <- first "input" !(query "#click-me")
  Just list <- first "element" !(query "ul#list")
  onEvent Click clickMe click
  -- onEvent Click list dth -- compile time error
  onEvent Click clickMe (gen list)
  onEvent DoubleClick list (gen list)
  Just dt <- first "input" !(query "input#dt")
  onEvent Click dt dth
  onEvent MouseMove list mm
  Just keys <- first "element" !(query "input#keys")
  onEvent KeyDown keys onk
  
-- Local Variables:
-- idris-packages: ("effects" "iquery")
-- End:
