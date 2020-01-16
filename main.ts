namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
function SixWireSolve () {
    yellowCount = 0
    whiteCount = 0
    redCount = 0
    for (let index = 0; index <= WireList.length - 1; index++) {
        if (WireList[index] == 0) {
            redCount += 1
        } else if (WireList[index] == 3) {
            yellowCount += 1
        } else if (WireList[index] == 1) {
            whiteCount += 1
        }
    }
    if (yellowCount == 0 && SerialNumber % 2 == 1) {
        game.splash("Cut the Third Wire")
    } else if (yellowCount == 1 && whiteCount > 1) {
        game.splash("Cut the Fourth Wire")
    } else if (redCount == 0) {
        game.splash("Cut the Last Wire")
    } else {
        game.splash("Cut the Fourth Wire")
    }
}
function FiveWireSolve () {
    redCount = 0
    yellowCount = 0
    blackCount = 0
    for (let index = 0; index <= WireList.length - 1; index++) {
        if (WireList[index] == 0) {
            redCount += 1
        } else if (WireList[index] == 3) {
            yellowCount += 1
        } else if (WireList[index] == 0) {
            blackCount += 1
        }
    }
    if (WireList[4] == 4 && SerialNumber % 2 == 1) {
        game.splash("Cut the Fourth Wire")
    } else if (redCount == 1 && yellowCount > 1) {
        game.splash("Cut the First Wire")
    } else if (blackCount == 0) {
        game.splash("Cut the Second Wire")
    } else {
        game.splash("Cut the First Wire")
    }
}
function ThreeWireSolve () {
    redCount = 0
    blueCount = 0
    for (let index = 0; index <= WireList.length - 1; index++) {
        if (WireList[index] == 0) {
            redCount += 1
        } else if (WireList[index] == 2) {
            blueCount += 1
        }
    }
    if (redCount == 0) {
        game.splash("Cut the Second Wire")
    } else if (WireList[2] == 1) {
        game.splash("Cut the Last Wire")
    } else if (blueCount > 1) {
        if (WireList[2] == 2) {
            game.splash("Cut the Last Wire")
        } else {
            game.splash("Cut the Second Wire")
        }
    } else {
        game.splash("Cut the Last Wire")
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = WireList[cursorPos] - 1
    if (WireList[cursorPos] < 0) {
        WireList[cursorPos] = colourList.length - 1
    }
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value of sprite_list) {
        if (value.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function startPhase () {
    while (wireCount < 3 || wireCount > 6) {
        wireCount = game.askForNumber("# of wires? (3-6)", 1)
    }
}
// Move the cursor to the next position or loop back
// to the top.
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += 1
    cursorPos = cursorPos % wireCount
    UpdateCursor()
})
function InitSerial () {
    SerialNumber = game.askForNumber("Last Digit of Serial Number", 1)
}
function InitWirePhase () {
    InitColours()
    InitCursor()
}
function InitCursor () {
    mySprite = img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
`
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function FourWireSolve () {
    redCount = 0
    blueCount = 0
    yellowCount = 0
    for (let index = 0; index <= WireList.length - 1; index++) {
        if (WireList[index] == 0) {
            redCount += 1
        } else if (WireList[index] == 2) {
            blueCount += 1
        } else if (WireList[index] == 3) {
            yellowCount += 1
        }
    }
    if (redCount > 1 && SerialNumber % 2 == 1) {
        game.splash("Cut the Last Red Wire")
    } else if (redCount == 0 && WireList[3] == 3) {
        game.splash("Cut the First Wire")
    } else if (blueCount == 1) {
        game.splash("Cut the First Wire")
    } else if (yellowCount > 1) {
        game.splash("Cut the Last Wire")
    } else {
        game.splash("Cut the Second Wire")
    }
}
function InitColours () {
    // red, white, blue  yellow, black
    colourList = [2, 1, 8, 5, 15]
    WireList = []
    Ratio = wireCount + 1
    WireSprites = []
    for (let index2 = 0; index2 <= wireCount - 1; index2++) {
        WireList.push(0)
        mySprite = img`
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 
`
        mySprite.fill(colourList[WireList[index2]])
        mySprite.drawRect(0, 0, 160, 5, 15)
        WireSprites.push(mySprite)
        mySprite2 = sprites.create(mySprite, SpriteKind.Wire)
        mySprite2.top = Math.floor(120 / Ratio) * (index2 + 1)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (wireCount == 3) {
        ThreeWireSolve()
    }
    if (wireCount == 4) {
        FourWireSolve()
    }
    if (wireCount == 5) {
        FiveWireSolve()
    }
    if (wireCount == 6) {
        SixWireSolve()
    }
})
sprites.onCreated(SpriteKind.Wire, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value2 of sprite_list) {
        if (value2.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value2.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
let mySprite: Image = null
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let blueCount = 0
let blackCount = 0
let SerialNumber = 0
let WireList: number[] = []
let redCount = 0
let whiteCount = 0
let yellowCount = 0
let cursorPos = 0
let Ratio = 0
let cursor: Sprite = null
let wireCount = 0
wireCount = 0
startPhase()
if (wireCount > 3) {
    InitSerial()
}
scene.setBackgroundColor(1)
InitWirePhase()
