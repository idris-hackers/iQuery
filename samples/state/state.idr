module Main

import IQuery

first : (et : ElementType) -> NodeList -> IO (Maybe (Element et))
first et = flip (elemAt et) 0

push : StateC (STList STString) -> Event t "input" -> IO Int
push s e = do
  Just input <- query "input#pushVal" >>= first "input"
  Just xs    <- get s =>> fromState
  text <- getValue input
  get s :=> toState (text :: xs)
  pure 1

shift : StateC (STList STString) -> Event t "input" -> IO Int
shift s e = do
  Just x <- get s =>> access 0 =>> fromState
    | Nothing => do
                 alert "stack is empty" 
                 pure 1
  alert x
  Just (_::xs) <- get s =>> fromState
  get s :=> toState xs
  pure 1

main : IO ()
main = do
  queue <- newState (STList STString) Nil
  Just p <- first "input" !(query "input#pushAct")
  onEvent Click p (push queue) 
  Just s <- first "input" !(query "input#shiftAct")
  onEvent Click s (shift queue) 
  pure ()
