module Event

%access public

abstract
data Event : Type where
  MkEvent : Ptr -> Event

public
data EventType : Type where
  Click : EventType

instance Show EventType where
  show Click = "onclick"
