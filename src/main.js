require.config({
    paths: {
        'underscore': 'lib/underscore'
    },

    shim: {
        'underscore':{ 
            exports: '_'
        }
    }

});

require(['underscore', "game"], function(_, game){
    var b = document.board
    var pureCells = new Array(b.c1,b.c2,b.c3,b.c4,b.c5,b.c6,b.c7,b.c8,b.c9)

    var controlPanel = {
        newButton: document.getElementById("new-button"),
        playerList: document.getElementsByClassName("player-option")
    }

    var Game = game.Game
    var game = new Game(pureCells, controlPanel)
    game.newGame()

});
