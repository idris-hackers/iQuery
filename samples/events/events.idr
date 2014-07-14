module Main

import IQuery
import Effect.StdIO

first : (et : ElementType) -> NodeList -> IO (Maybe (Element et))
first et = flip (elemAt et) 0

click : { [DOM, EVENT Click Unspecified] } Eff IO Int
click = do
  setValue !target $ (show !clientX) ++ ", " ++ (show !clientY)
  pure 1

-- generic handler 
gen : Element Unspecified -> { [DOM, EVENT et Unspecified] } Eff IO Int
gen ul = do
  -- x <- clientX -- compile time error
  n <- newElement "li"
  setText n "generic"
  appendChild ul n
  pure 1
 
-- handle only specified element type
dth : { [DOM, EVENT et Date] } Eff IO Int
dth = do
  Date.setMin !target "2012-12-12"
  pure 1
  
main : IO ()
main = do
  --Just res <- first Unspecified !(query "#result")
  Just clickMe <- first Unspecified !(query "#click-me")
  Just list <- first Unspecified !(query "ul#list")
  onClick clickMe click
  onDoubleClick clickMe (gen list)
  Just dt <- first Date !(query "input#dt")
  onClick dt dth
-- Local Variables:
-- idris-packages: ("effects" "iquery")
-- End:
