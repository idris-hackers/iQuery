module Main

import IQuery

push : StateC (STList STString) -> Event -> IO Int
push s e = do
  Just input <- query "input#pushVal" >>= (\x => elemAt x 0)
  Just xs    <- get s =>> fromState
  text <- getValue input
  get s :=> toState (text :: xs)
  pure 1

shift : StateC (STList STString) -> Event -> IO Int
shift s e = do
  Just x <- get s =>> access 0 =>> fromState
    | Nothing => do
                 alert "stack is empty" 
                 pure 1
  alert x
  Just (_::xs) <- get s =>> fromState
  get s :=> toState xs
  pure 1

setV : Event -> IO Int
setV e = do
     Just el <- !(query "input#val") `elemAt` 0
     setValue el "wohoo"
     pure 1
     
main : IO ()
main = do
  queue <- newState (STList STString) Nil
  Just p <- !(query "input#pushAct") `elemAt` 0
  onClick p (push queue) 
  Just s <- !(query "input#shiftAct") `elemAt` 0
  onClick s (shift queue) 
  Just sv <- !(query "input#setVal") `elemAt` 0
  onClick sv setV 
  pure ()
