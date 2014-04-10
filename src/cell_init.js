define(function(){
    var cells = [];
    var turn = -1,
        tie = 0,
        oWin = 0,
        xWin = 0,
        firstPlayer = "X",
        secondPlayer = "O";

    var b = document.board;
    cells = new Array(b.c1,b.c2,b.c3,b.c4,b.c5,b.c6,b.c7,b.c8,b.c9)

    return {
        getCells: function(){
            return cells
        }, 
        getFirstPlayer: function(){
            return firstPlayer
        },
        getSecondPlayer: function() {
            return secondPlayer
        }, 
        getNextTurn: function(){
            return turn
        }
    }
})
