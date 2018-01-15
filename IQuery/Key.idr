module IQuery.Key

%access public export

data MouseButton : Type where
  MouseLeft : MouseButton
  MouseMiddle : MouseButton
  MouseRight : MouseButton

data Key : Type where
  KeySpace : Key
  KeyEnter : Key
  KeyTab : Key
  KeyEsc : Key
  KeyBackspace : Key
  KeyShift : Key
  KeyControl : Key
  KeyAlt : Key
  KeyCapsLock : Key
  KeyNumLock : Key
  KeyArrowLeft : Key
  KeyArrowUp : Key
  KeyArrowRight : Key
  KeyArrowDown : Key
  KeyIns : Key
  KeyDel : Key
  KeyHome : Key
  KeyEnd : Key
  KeyPgUp : Key
  KeyPgDown : Key
  KeyF1 : Key
  KeyF2 : Key
  KeyF3 : Key
  KeyF4 : Key
  KeyF5 : Key
  KeyF6 : Key
  KeyF7 : Key
  KeyF8 : Key
  KeyF9 : Key
  KeyF10 : Key
  KeyF11 : Key
  KeyF12 : Key
  KeyPadDel : Key
  KeyPadIns : Key
  KeyPadEnd : Key
  KeyPadDown : Key
  KeyPadPgDown : Key
  KeyPadLeft : Key
  KeyPadRight : Key
  KeyPadHome : Key
  KeyPadUp : Key
  KeyPadPgUp : Key
  KeyPadAdd : Key
  KeyPadSub : Key
  KeyPadMul : Key
  KeyPadDiv : Key
  KeyPadEnter : Key
  KeyPadDot : Key
  KeyPad0 : Key
  KeyPad1 : Key
  KeyPad2 : Key
  KeyPad3 : Key
  KeyPad4 : Key
  KeyPad5 : Key
  KeyPad6 : Key
  KeyPad7 : Key
  KeyPad8 : Key
  KeyPad9 : Key
  Key0 : Key
  Key1 : Key
  Key2 : Key
  Key3 : Key
  Key4 : Key
  Key5 : Key
  Key6 : Key
  Key7 : Key
  Key8 : Key
  Key9 : Key
  KeyA : Key
  KeyB : Key
  KeyC : Key
  KeyD : Key
  KeyE : Key
  KeyF : Key
  KeyG : Key
  KeyH : Key
  KeyI : Key
  KeyJ : Key
  KeyK : Key
  KeyL : Key
  KeyM : Key
  KeyN : Key
  KeyO : Key
  KeyP : Key
  KeyQ : Key
  KeyR : Key
  KeyS : Key
  KeyT : Key
  KeyU : Key
  KeyV : Key
  KeyW : Key
  KeyX : Key
  KeyY : Key
  KeyZ : Key

toButtonCode : MouseButton -> Int
toButtonCode MouseLeft = 0
toButtonCode MouseMiddle = 1
toButtonCode MouseRight = 2

fromButtonCode : Int -> Maybe MouseButton
fromButtonCode 0 = Just MouseLeft
fromButtonCode 1 = Just MouseMiddle
fromButtonCode 2 = Just MouseRight
fromButtonCode _ = Nothing


toKeyCode : Key -> Int
toKeyCode KeySpace = 32
toKeyCode KeyEnter = 13
toKeyCode KeyTab = 9
toKeyCode KeyEsc = 27
toKeyCode KeyBackspace = 8
toKeyCode KeyShift = 16
toKeyCode KeyControl = 17
toKeyCode KeyAlt = 18
toKeyCode KeyCapsLock = 20
toKeyCode KeyNumLock = 144
toKeyCode KeyArrowLeft = 37
toKeyCode KeyArrowUp = 38
toKeyCode KeyArrowRight = 39
toKeyCode KeyArrowDown = 40
toKeyCode KeyIns = 45
toKeyCode KeyDel = 46
toKeyCode KeyHome = 36
toKeyCode KeyEnd = 35
toKeyCode KeyPgUp = 33
toKeyCode KeyPgDown = 34
toKeyCode KeyF1 = 112
toKeyCode KeyF2 = 113
toKeyCode KeyF3 = 114
toKeyCode KeyF4 = 115
toKeyCode KeyF5 = 116
toKeyCode KeyF6 = 117
toKeyCode KeyF7 = 118
toKeyCode KeyF8 = 119
toKeyCode KeyF9 = 120
toKeyCode KeyF10 = 121
toKeyCode KeyF11 = 122
toKeyCode KeyF12 = 123
toKeyCode KeyPadDel = 46
toKeyCode KeyPadIns = 45
toKeyCode KeyPadEnd = 35
toKeyCode KeyPadDown = 40
toKeyCode KeyPadPgDown = 34
toKeyCode KeyPadLeft = 37
toKeyCode KeyPadRight = 39
toKeyCode KeyPadHome = 36
toKeyCode KeyPadUp = 38
toKeyCode KeyPadPgUp = 33
toKeyCode KeyPadAdd = 107
toKeyCode KeyPadSub = 109
toKeyCode KeyPadMul = 106
toKeyCode KeyPadDiv = 111
toKeyCode KeyPadEnter = 13
toKeyCode KeyPadDot = 46
toKeyCode KeyPad0 = 48
toKeyCode KeyPad1 = 49
toKeyCode KeyPad2 = 50
toKeyCode KeyPad3 = 51
toKeyCode KeyPad4 = 52
toKeyCode KeyPad5 = 53
toKeyCode KeyPad6 = 54
toKeyCode KeyPad7 = 55
toKeyCode KeyPad8 = 56
toKeyCode KeyPad9 = 57
toKeyCode Key0 = 48
toKeyCode Key1 = 49
toKeyCode Key2 = 50
toKeyCode Key3 = 51
toKeyCode Key4 = 52
toKeyCode Key5 = 53
toKeyCode Key6 = 54
toKeyCode Key7 = 55
toKeyCode Key8 = 56
toKeyCode Key9 = 57
toKeyCode KeyA = 65
toKeyCode KeyB = 66
toKeyCode KeyC = 67
toKeyCode KeyD = 68
toKeyCode KeyE = 69
toKeyCode KeyF = 70
toKeyCode KeyG = 71
toKeyCode KeyH = 72
toKeyCode KeyI = 73
toKeyCode KeyJ = 74
toKeyCode KeyK = 75
toKeyCode KeyL = 76
toKeyCode KeyM = 77
toKeyCode KeyN = 78
toKeyCode KeyO = 79
toKeyCode KeyP = 80
toKeyCode KeyQ = 81
toKeyCode KeyR = 82
toKeyCode KeyS = 83
toKeyCode KeyT = 84
toKeyCode KeyU = 85
toKeyCode KeyV = 86
toKeyCode KeyW = 87
toKeyCode KeyX = 88
toKeyCode KeyY = 89
toKeyCode KeyZ = 90

fromKeyCode : Int -> Maybe Key
fromKeyCode 32 = Just KeySpace
fromKeyCode 13 = Just KeyEnter
fromKeyCode 9 = Just KeyTab
fromKeyCode 27 = Just KeyEsc
fromKeyCode 8 = Just KeyBackspace
fromKeyCode 16 = Just KeyShift
fromKeyCode 17 = Just KeyControl
fromKeyCode 18 = Just KeyAlt
fromKeyCode 20 = Just KeyCapsLock
fromKeyCode 144 = Just KeyNumLock
fromKeyCode 37 = Just KeyArrowLeft
fromKeyCode 38 = Just KeyArrowUp
fromKeyCode 39 = Just KeyArrowRight
fromKeyCode 40 = Just KeyArrowDown
fromKeyCode 45 = Just KeyIns
fromKeyCode 46 = Just KeyDel
fromKeyCode 36 = Just KeyHome
fromKeyCode 35 = Just KeyEnd
fromKeyCode 33 = Just KeyPgUp
fromKeyCode 34 = Just KeyPgDown
fromKeyCode 112 = Just KeyF1
fromKeyCode 113 = Just KeyF2
fromKeyCode 114 = Just KeyF3
fromKeyCode 115 = Just KeyF4
fromKeyCode 116 = Just KeyF5
fromKeyCode 117 = Just KeyF6
fromKeyCode 118 = Just KeyF7
fromKeyCode 119 = Just KeyF8
fromKeyCode 120 = Just KeyF9
fromKeyCode 121 = Just KeyF10
fromKeyCode 122 = Just KeyF11
fromKeyCode 123 = Just KeyF12
fromKeyCode 107 = Just KeyPadAdd
fromKeyCode 109 = Just KeyPadSub
fromKeyCode 106 = Just KeyPadMul
fromKeyCode 111 = Just KeyPadDiv
fromKeyCode 48 = Just Key0
fromKeyCode 49 = Just Key1
fromKeyCode 50 = Just Key2
fromKeyCode 51 = Just Key3
fromKeyCode 52 = Just Key4
fromKeyCode 53 = Just Key5
fromKeyCode 54 = Just Key6
fromKeyCode 55 = Just Key7
fromKeyCode 56 = Just Key8
fromKeyCode 57 = Just Key9
fromKeyCode 65 = Just KeyA
fromKeyCode 66 = Just KeyB
fromKeyCode 67 = Just KeyC
fromKeyCode 68 = Just KeyD
fromKeyCode 69 = Just KeyE
fromKeyCode 70 = Just KeyF
fromKeyCode 71 = Just KeyG
fromKeyCode 72 = Just KeyH
fromKeyCode 73 = Just KeyI
fromKeyCode 74 = Just KeyJ
fromKeyCode 75 = Just KeyK
fromKeyCode 76 = Just KeyL
fromKeyCode 77 = Just KeyM
fromKeyCode 78 = Just KeyN
fromKeyCode 79 = Just KeyO
fromKeyCode 80 = Just KeyP
fromKeyCode 81 = Just KeyQ
fromKeyCode 82 = Just KeyR
fromKeyCode 83 = Just KeyS
fromKeyCode 84 = Just KeyT
fromKeyCode 85 = Just KeyU
fromKeyCode 86 = Just KeyV
fromKeyCode 87 = Just KeyW
fromKeyCode 88 = Just KeyX
fromKeyCode 89 = Just KeyY
fromKeyCode 90 = Just KeyZ
fromKeyCode _ = Nothing
