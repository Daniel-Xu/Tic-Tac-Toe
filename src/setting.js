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

    return {
        wins: wins, 
        turnEnum: turnEnum,
        playerSymbol: playerSymbol
    }
})
