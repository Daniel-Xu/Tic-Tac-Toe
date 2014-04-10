define(['cell_init', 'status'], function(cellsInit, status){

    var turn = cellsInit.getNextTurn()
    var cells = cellsInit.getCells()

    // - - - - - - - - -
    // 8 7 6 5 4 3 2 1 0
    function getLegalMoves(state){
        var moves = 0;
        for (var i=0; i<9; i++){
            if(status.isCellBlank(state,i)){
                moves |= 1 << i;
            }
        }
        return moves;
    }

    function availableMoveNum(moves)
    {
        var num = 0;
        for (var i=0; i<9; i++){
            if ((moves & (1<<i)) != 0) num++;
        }

        return num;
    }

    function moveRandom(moves){
        var numMoves = availableMoveNum(moves);
        if (numMoves > 0){
            //moveNum is random num in [1, numMove]
            var moveNum = Math.floor(Math.random()*numMoves +1);
            numMoves = 0;
            for (var j=0; j<9; j++){
                if ((moves & (1<<j)) != 0) numMoves++;
                if (numMoves == moveNum){
                    move(cells[j]);
                    return;
                }
            }
        }
    }

    //  -  -  -  -  -  -  -  -  - - - - - - - - - -
    // 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    function knownStrategy(state){
        var mask = state & 0x2AAAA;	

        //all blank
        if (mask == 0x00000) return 0x1FF;

        //4 center 
        //if one player fills the center, the best move will be 
        //corner, or you will lose
        
        if (mask == 0x00200) return 0x145;

        //0 2 6 8  
        //if corner is filled, then you must take the center
        //or you will fail quickly

        if (mask == 0x00002 ||
            mask == 0x00020 ||
            mask == 0x02000 ||
            mask == 0x20000) return 0x010;

        //1 3 5 7 edge
        // if one use choose edges, the other should choose cell that are in same row
        // or column
        if (mask == 0x00008) return 0x095;
        if (mask == 0x00080) return 0x071;
        if (mask == 0x00800) return 0x11C;
        if (mask == 0x08000) return 0x152;

        return 0;
    }

    function perfectMove(){
        var state = status.getState();
        var winner = status.detectWin(state);

        if (winner == 0){
            var moves = getLegalMoves(state);

            //Because the AI is unbeatable, so this is the minimum scenario
            var hope = -999;
            var goodMoves = knownStrategy(state);
            
            //not blank or just one scenario 
            if (goodMoves == 0){
                for (var i=0; i<9; i++){
                    //for these legal move
                    if ((moves & (1<<i)) != 0) {
                        var value = moveValue(state, i, turn, turn, 1);
                        if (value > hope){
                            hope = value;
                            goodMoves = 0;
                        }
                        //get all the possible best move
                        if (hope == value){
                            goodMoves |= (1<<i);
                        }
                    }
                }
            }
            moveRandom(goodMoves);
        }
    }

    //depth is to make sure that the AI will not lose himself too early
    //moveFor == nextTurn -> AI 
    function moveValue(istate, move, moveFor, nextTurn, depth){
        //simulate the state
        var state = stateMove(istate, move, nextTurn);
        var winner = status.detectWin(state)

        if ((winner & 0x300000) == 0x300000){
            return 0;
        } else if (winner != 0){
            if (moveFor == nextTurn) return 10 - depth;
            else return depth - 10;
        }
        
        //if the the current operation is not the same with the original, minimum scenario
        //if the the current operation is the same with the original, maximum scenario
        var hope = 999;
        if (moveFor != nextTurn) hope = -999;

        var moves = getLegalMoves(state);
        for (var i=0; i<9; i++){
            if ((moves & (1<<i)) != 0) {
                var value = moveValue(state, i, moveFor, -nextTurn,  depth+1);
                if (moveFor == nextTurn && value < hope  ||moveFor != nextTurn && value > hope ){
                    hope = value;
                }            

            }
        }

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
        var value = 0x3;
        if (nextTurn == -1) value = 0x2;
        return (state | (value << (move*2)));
    }

    function move(cell){
        if (cell.value == ''){
            var state = status.getState();
            var winner = status.detectWin(state);

            if (winner == 0){
                for (var i=0; i<9; i++){
                    if (cells[i] == cell){
                        state = stateMove(state, i, turn);
                    }
                }
                status.drawState(state);
                nextTurn();
            }
        }
    }

    function newGame(){
        turn = -1;
        status.drawState(0);
        nextTurn();
    }

    return {
        move: move,
        newGame: newGame
    }

})

