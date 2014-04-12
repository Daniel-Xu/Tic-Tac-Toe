define(['cell_init', 'underscore'], function(cellsInit, _){

    var cells = cellsInit.getCells()
    var firstPlayer = cellsInit.getFirstPlayer()
    var secondPlayer = cellsInit.getSecondPlayer()

    function isArray(obj){
        var toString = Object.prototype.toString

        return toString.call(obj) === '[object Array]'
    }

    function drawState(state){
        var winner = detectWin(state)
        var forDrawing = winner

        _.each(state, function(ele, i){
            if(isArray(winner) && _.contains(winner, i)) {
                cells[i].style.backgroundColor='red';
            } else {
                if(cells[i].style.backgroundColor == "red")
                    cells[i].style.backgroundColor='#3498db';
            }
        
            cells[i].value = state[i];
        })

        if(winner === "tie"){
            alert("It's a tie! Nice try!");
        }
    }
    
    function getState(){
        var state = [];
        for (var i=0; i<9; i++){
            state.push(cells[i].value)
        }

        return state;
    }

    //just test whether it's blank
    function isCellBlank(state, cellnum)
    {
        return state[cellnum] === ''
    }

    function isCellSet(state, cellnum)
    {
        return state[cellnum] !== ''
    }


    function isFull(state) {
        if(_.contains(state, ''))
            return false

        return true
    }

    //[] in wins  "tie" or 0
    function detectWin(state){

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

         var winner = _.find(wins, function(situation){

            return (state[situation[0]] === state[situation[1]]
              && state[situation[0]] === state[situation[2]]
              && state[situation[0]] !== '') 
        })

        if(winner !== undefined)
            return winner

        if(isFull(state))
            return "tie"

        return 0
    }       

    return {
        detectWin: detectWin,
        isCellBlank: isCellBlank,
        isCellSet: isCellSet,
        getState: getState,
        drawState: drawState
    }
})
