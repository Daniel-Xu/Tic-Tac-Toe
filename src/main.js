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
    
});
