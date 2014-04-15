define(['cell_init', 'status', 'underscore'], function(cellsInit, status, _){

    var currentPlayer = cellsInit.getCurrentPlayer()
    var cells = cellsInit.getCells()
    var firstPlayer = cellsInit.getFirstPlayer()
    var secondPlayer = cellsInit.getSecondPlayer()
    var turnEnum = cellsInit.getTurnEnum()

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
            var goodMoves = knownStrategy(state)
            
            //not blank or just one scenario 
            if (goodMoves.length === 0){
                _.each(moves, function(i, index){
                    var value = moveValue(state, i, currentPlayer, currentPlayer, 1);
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


    function isJustOneSet(state, i){
        var remainEle =  _.without(state, state[i])

        var isRemainsBlank = _.every(remainEle, function(ele, i){
            return status.isCellBlank(remainEle, i)
        })

        if(status.isCellSet(state, i) && isRemainsBlank)
            return true

        return false
    
    }

    function knownStrategy(state){
        //all blank
        if (_.every(state, function(ele, i){
            return status.isCellBlank(state, i)
        })) 
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        //4 center 
        //if one player fills the center, the best move will be 
        //corner, or you will lose
        if(isJustOneSet(state, 4)) {
            return [0, 2, 6, 8] 
        }

        //0 2 6 8  
        //if corner is filled, then you must take the center
        //or you will fail quickly
        if(isJustOneSet(state, 0) 
          || isJustOneSet(state,2)
          || isJustOneSet(state, 6)
          || isJustOneSet(state, 8))
          return [4]


        //1 3 5 7 edge
        // if one use choose edges, the other should choose cell that are in same row
        // or column
        if(isJustOneSet(state, 1))
            return [0, 2, 4, 7]
        if(isJustOneSet(state, 3))
            return [0,4, 5,6]
        if(isJustOneSet(state, 5))
            return [2, 3, 4, 8]
        if(isJustOneSet(state, 7))
            return [1, 4, 6, 8]

        return [];
    }
    
    function moveValue(istate, move, originalPlayer, currentPlayer, depth){
        //simulate the state
        var state = stateMove(istate, move, currentPlayer);
        var winner = status.detectWin(state)

        if (winner == 'tie'){
            return 0;
        } else if (winner != 0){
            if (originalPlayer == currentPlayer) return 10 - depth;
            else return depth - 10;
        }
        
        var hope = 999;
        if (originalPlayer != currentPlayer) hope = -999;

        var moves = getLegalMoves(state);

        _.each(moves, function(i, index){
            var value = moveValue(state, i, originalPlayer, -currentPlayer,  depth+1);
            if (originalPlayer == currentPlayer && value < hope  
                ||originalPlayer != currentPlayer && value > hope ){
                hope = value;
            }            
        })

        return hope;

    }

    function stateMove(state, move, currentPlayer){
        //here need to be written down
        //notice the state will be changed in the function

        var newState = state.slice(0);
        var value = firstPlayer;
        if (currentPlayer == turnEnum.secondPlayer) value = secondPlayer;
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
                        state = stateMove(state, i, currentPlayer);
                    }
                
                })

                status.drawState(state);
                changeTurn();
            }
        }
    }

    function changeTurn(){
        currentPlayer = -currentPlayer;
        if(currentPlayer == turnEnum.firstPlayer){
            if(document.board.real[1].checked) perfectMove();
        }else {
            if(document.board.real[0].checked) perfectMove();
        }
    }

    function newGame(){
        //-1 is secondPlayer, 1 is firstPlayer
        currentPlayer = turnEnum.secondPlayer;
        status.drawState(['', '','','', '', '', '', '', '']);
        changeTurn();
    }

    return {
        move: move,
        newGame: newGame
    }
})


