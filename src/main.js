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

require(['operation', 'underscore'], function(operation, _){
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
});
