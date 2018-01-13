module Ajax

%access private

data XMLHttpRequest : Type where
  MkXHR : Ptr -> XMLHttpRequest

data ReadyState : Type where
  Unsent : ReadyState
  Opened : ReadyState
  HeadersReceived : ReadyState
  Loading : ReadyState
  Done : ReadyState

public export
data Method : Type where
  GET : Method
  POST : Method

new : IO XMLHttpRequest
new = [| MkXHR (mkForeign (FFun "new XMLHttpRequest" [] FPtr)) |]

open : XMLHttpRequest -> Method -> String -> Bool -> IO ()
open (MkXHR xhr) method url async =
  mkForeign (
    FFun "%0.open(%1,%2,%3)" [FPtr, FString, FString, FInt] FUnit
  ) xhr (toMethod method) url (toAsync async)
  where toMethod : Method -> String
        toMethod GET = "GET"
        toMethod POST = "POST"

        toAsync : Bool -> Int
        toAsync True = 1
        toAsync False = 0

setRequestHeader : XMLHttpRequest -> String -> String -> IO ()
setRequestHeader (MkXHR xhr) name value =
  mkForeign (
    FFun "%0.setRequestHeader(%1, %2)" [FPtr, FString, FString] FUnit
  ) xhr name value

readyState : XMLHttpRequest -> IO ReadyState
readyState (MkXHR xhr) = do
  r <- mkForeign (FFun "%0.readyState" [FPtr] FInt) xhr
  pure $ case r of
              1 => Opened
              2 => HeadersReceived
              3 => Loading
              4 => Done
              _ => Unsent

responseText : XMLHttpRequest -> IO String
responseText (MkXHR xhr) = mkForeign (FFun "%0.responseText" [FPtr] FString) xhr

status : XMLHttpRequest -> IO Int
status (MkXHR xhr) = mkForeign (FFun "%0.status" [FPtr] FInt) xhr

onReadyStateChange : XMLHttpRequest -> IO () -> IO ()
onReadyStateChange (MkXHR x) f =
  mkForeign (
    FFun "%0.onreadystatechange=%1" [FPtr, FFunction FUnit (FAny (IO ()))] FUnit
  ) x (const f)

send : XMLHttpRequest -> String -> IO ()
send (MkXHR xhr) r = mkForeign (FFun "%0.send(%1)" [FPtr, FString] FUnit) xhr r

public export
ajax : Method -> String -> Bool -> List (String, String) -> String ->
       (Either Int String -> IO ()) -> IO ()
ajax method url async headers dat callback = do
  xhr <- new
  open xhr method url async
  traverse (uncurry $ setRequestHeader xhr) headers
  onReadyStateChange xhr $ do rs <- readyState xhr
                              case rs of
                                   Done => do s <- status xhr
                                              case s of
                                                  200 => do t <- responseText xhr
                                                            callback $ Right t
                                                  _ => callback $ Left s
                                   _ => return ()
  send xhr dat
