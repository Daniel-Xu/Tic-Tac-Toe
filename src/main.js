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
    //change the text with setting
    var player1 = document.getElementById('player1')
    var player2 = document.getElementById('player2')
    player1.innerHTML = cellsInit.getFirstPlayer()
    player2.innerHTML = cellsInit.getSecondPlayer()

    //click event
    var cells = document.getElementsByClassName('handle')
    _.each(cells, function(item, num){
        item.addEventListener("click", function(){
            operation.move(this)
        })  
    })

    //option event
    var players = document.getElementsByClassName("player-option")
    _.each(players,function(item, i){
        item.addEventListener("change", function(){
            operation.newGame()
        })
    })
    
    //new game event
    var newButton = document.getElementById("new-button")
    newButton.addEventListener('click', function(){
        operation.newGame()
    })

    operation.newGame()
});
