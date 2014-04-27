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

require(['underscore', "setting", "game"], function(_, setting, Game){
    var pureCells = setting.pureCells
    var controlPanel = setting.controlPanel

    var game = new Game(pureCells, controlPanel)
    game.newGame()

});
