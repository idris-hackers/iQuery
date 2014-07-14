module Input

import IQuery.Elements

%access public
    
namespace Date   
  setMin : Element Date -> String -> IO ()
  setMin = Priv.setProperty "min"

  setMax : Element Date -> String -> IO ()
  setMax = Priv.setProperty "max"
