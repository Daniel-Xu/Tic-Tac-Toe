define(function(){

    var turnEnum = {
        firstPlayer:  1,
        secondPlayer: -1
    }

    var playerSymbol = {
        firstPlayerSymbol: "X", 
        secondPlayerSymbol: "O"
    }

    var wins = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    var b = document.board
    var domCells = new Array(b.c1,b.c2,b.c3,b.c4,b.c5,b.c6,b.c7,b.c8,b.c9)

    var controlPanel = {
        newButton: document.getElementById("new-button"),
        playerList: document.getElementsByClassName("player-option")
    }

    var pureCells = ["", "", "", "", "", "", "", "", ""]

    return {
        wins: wins, 
        turnEnum: turnEnum,
        playerSymbol: playerSymbol,
        domCells: domCells,
        controlPanel: controlPanel,
        pureCells: pureCells
    }
})
