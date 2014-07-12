module Input

%access public
        
abstract
data Input: Type where
  MkInput : Ptr -> Input 

mkInput : Ptr -> Input
mkInput = MkInput
