module Input

import Data.List
import Data.SortedMap
import IQuery.Elements

%access public

InputTypes : List ElementType
InputTypes = [Text, Date]

syntax validatedGetter [ts] [r] =
     Element et
  -> { default tactics { search 50 } prf : Elem et ts }
  -> IO r
  
syntax validatedSetter [ts] [r] =
     Element et
  -> r
  -> { default tactics { search 50 } prf : Elem et ts }
  -> IO ()

getAutoFocus : validatedGetter InputTypes Bool
getAutoFocus e = Priv.getBoolProperty "autofocus" e

setAutoFocus : validatedSetter InputTypes Bool
setAutoFocus el v = Priv.setBoolProperty "autofocus" el v

getDefaultValue : validatedGetter InputTypes String
getDefaultValue el = Priv.getProperty FString "default" el

setDefaultValue : validatedSetter InputTypes String
setDefaultValue el v = Priv.setProperty FString "default" el v

namespace Text
  setAutoComplete : Element Text -> String -> IO ()
  setAutoComplete el v = Priv.setProperty FString "autocomplete" el v
  
  getAutoComplete : Element Text -> IO String
  getAutoComplete = Priv.getProperty FString "autocomplete"
  
namespace Date   
  setMin : Element Date -> String -> IO ()
  setMin = Priv.setProperty FString "min"

  setMax : Element Date -> String -> IO ()
  setMax = Priv.setProperty FString "max"
