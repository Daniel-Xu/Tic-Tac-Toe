define(['cell_init', 'status', 'underscore'], function(cellsInit, status, _){

    var turn = cellsInit.getNextTurn()
    var cells = cellsInit.getCells()
    var firstPlayer = cellsInit.getFirstPlayer()
    var secondPlayer = cellsInit.getSecondPlayer()

    function getLegalMoves(state){
        
        var moves = []
        _.each(cells, function(cell, i){
            if(status.isCellBlank(state, i))
                moves.push(i)
        })
        
        return moves

    }

    function moveRandom(moves){
        var numMoves = moves.length;

        if (numMoves > 0){
            //moveNum is random num in [1, numMove]
            var moveNum = Math.floor(Math.random()*numMoves +1);

            numMoves = 0;

            _.any(moves, function(i, index){
                if(index+1 === moveNum){
                    move(cells[i]);
                    return true
                }
            
            })
        }
    }


    function perfectMove(){
        var state = status.getState();
        var winner = status.detectWin(state);

        if (winner == 0){
            var moves = getLegalMoves(state);

            //Because the AI is unbeatable, so this is the minimum scenario
            var hope = -999;
            var goodMoves = []
            
            //not blank or just one scenario 
            if (goodMoves.length === 0){
                _.each(moves, function(i, index){
                    var value = moveValue(state, i, turn, turn, 1);
                    if (value > hope){
                        hope = value;
                        goodMoves = [];
                    }

                    if (hope == value){
                        goodMoves.push(i);
                    }
                })
            }
            moveRandom(goodMoves);
        }
    }

    function moveValue(istate, move, moveFor, nextTurn, depth){
        //simulate the state
        var state = stateMove(istate, move, nextTurn);
        var winner = status.detectWin(state)

        if (winner == 'tie'){
            return 0;
        } else if (winner != 0){
            if (moveFor == nextTurn) return 10 - depth;
            else return depth - 10;
        }
        
        var hope = 999;
        if (moveFor != nextTurn) hope = -999;

        var moves = getLegalMoves(state);

        _.each(moves, function(i, index){
            var value = moveValue(state, i, moveFor, -nextTurn,  depth+1);
            if (moveFor == nextTurn && value < hope  ||moveFor != nextTurn && value > hope ){
            hope = value;
            }            
        })

        return hope;

    }

    function nextTurn(){
        //here the turn means nextTurn
        turn = -turn;
        if(turn == 1){
            if(document.board.real[1].checked) perfectMove();
        }else {
            if(document.board.real[0].checked) perfectMove();
        }
    }

    function stateMove(state, move, nextTurn){
        //here need to be written down
        //notice the state will be changed in the function

        var newState = state.slice(0);
        var value = firstPlayer;
        if (nextTurn == -1) value = secondPlayer;
        newState[move] = value
        return newState
    }

    function move(cell){
        if (cell.value == ''){
            var state = status.getState();
            var winner = status.detectWin(state);

            if (winner == 0){

                _.each(cells, function(ele, i){
                    if(ele == cell){
                        state = stateMove(state, i, turn);
                    }
                
                })

                status.drawState(state);
                nextTurn();
            }
        }
    }

    function newGame(){
        turn = -1;
        status.drawState(['', '','','', '', '', '', '', '']);
        nextTurn();
    }

    return {
        move: move,
        newGame: newGame
    }
})


