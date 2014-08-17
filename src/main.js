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

require(['underscore', "game", "render"], function(_, Game, Render){
    var game = new Game()
    game.newGame()

});
