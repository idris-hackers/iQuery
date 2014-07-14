module Input

import IQuery.Elements

%access public
    
namespace Date   
  setMin : Element Date -> String -> { [DOM] } Eff m ()
  setMin el v = call $ SetProperty "min" el v

  setMax : Element Date -> String -> { [DOM] } Eff m ()
  setMax el v = call $ SetProperty "max" el v
