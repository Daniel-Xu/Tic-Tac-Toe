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

require(['operation', 'underscore', 'cell_init'], function(operation, _, cellsInit){
    operation.newGame()
    var cells = document.getElementsByClassName('handle')

    _.each(cells, function(item, num){
        item.addEventListener("click", function(){
            operation.move(this)
        })  
    })

    var players = document.getElementsByClassName("player-option")

    _.each(players,function(item, i){
        item.addEventListener("change", function(){
            operation.newGame()
        })
    })
    
    var newButton = document.getElementById("new-button")
    newButton.addEventListener('click', function(){
        operation.newGame()
    })


    var player1 = document.getElementById('player1')
    var player2 = document.getElementById('player2')

    player1.innerHTML = cellsInit.getFirstPlayer()
    player2.innerHTML = cellsInit.getSecondPlayer()
});
