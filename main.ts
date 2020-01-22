namespace SpriteKind {
    export const Wire = SpriteKind.create()
}
// This instructs the cursor to start from the top of
// whatever platform it on by starting at the top to
// the sum of the math that has taken place
function UpdateCursor () {
    cursor.top = Math.floor(120 / Ratio) * (cursorPos + 1) - 2
}
// This is the threewire solve, what occurs is when
// the user places a certain colour (red and blue) the
// functions checks to see how much of that colour is
// there and where it's placed. It then instructs the
// user the exact wire they should cut.
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
    // Set the input range between 3-6 if any higher or
    // lower the question will reset
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
// This button resets the user back to the start
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    game.reset()
})
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
    // For a more thicker border place 2 rectangle same
    // width but different height
    mySprite.drawRect(0, 0, 160, 9, 10)
    mySprite.drawRect(0, 1, 160, 7, 10)
    cursor = sprites.create(mySprite, SpriteKind.Wire)
    // This function will send the user to the top to
    // start off, it will divide the ratio of the certain
    // solve by 120 and to be exact minus 2
    cursor.top = Math.floor(120 / Ratio) - 2
    cursorPos = 0
}
function FourWireSolve () {
    redCount = 0
    blueCount = 0
    yellowCount = 0
    // This just sets the colour in the array with the
    // colour used in this wire solve and just makes the
    // colour count go up by one
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
// If wire input is 3 wire call threeWireSolve  if
// wire input is 4 call fourWireSolve    if wire input
// is 5 call FiveWireSolve    if wire input is 6 call
// sixWireSolve
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
    // This just places the wirelist to start at the same
    // position the cursor starts off 
    //
    // This just places the wirelist to start at the same
    // position the cursor starts off 
    WireList[cursorPos] = (WireList[cursorPos] + 1) % colourList.length
    // This fills the wiresprite with the exact colour its
    // set to in the array 
    WireSprites[cursorPos].fill(colourList[WireList[cursorPos]])
    WireSprites[cursorPos].drawRect(0, 0, 160, 5, 15)
    sprite_list = sprites.allOfKind(SpriteKind.Wire)
    for (let value2 of sprite_list) {
        // Each time the user changes the colour, it destroys
        // the value to got to place the new colour value
        if (value2.top == Math.floor(120 / Ratio) * (cursorPos + 1)) {
            value2.destroy()
        }
    }
    mySprite2 = sprites.create(WireSprites[cursorPos], SpriteKind.Wire)
    mySprite2.top = Math.floor(120 / Ratio) * (cursorPos + 1)
})
function FiveWireSolve () {
    redCount = 0
    yellowCount = 0
    blackCount = 0
    for (let index = 0; index <= WireList.length - 1; index++) {
        if (WireList[index] == 0) {
            redCount += 1
        } else if (WireList[index] == 3) {
            yellowCount += 1
        } else if (WireList[index] == 4) {
            blackCount += 1
        }
    }
    // Set wirelist to get value at 4 which equal colour
    // black in the array. Divide serialNumber by 2 and if
    // it equals one or anything small it is odd
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
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorPos += -1
    if (cursorPos < 0) {
        cursorPos = wireCount - 1
    }
    UpdateCursor()
})
let blackCount = 0
let whiteCount = 0
let yellowCount = 0
let mySprite: Image = null
let SerialNumber = 0
let mySprite2: Sprite = null
let sprite_list: Sprite[] = []
let WireSprites: Image[] = []
let colourList: number[] = []
let WireList: number[] = []
let blueCount = 0
let redCount = 0
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
