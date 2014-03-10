var turn = -1;

var cells;
function drawCells(){
    var b = document.board;

    //cells are 9 button
    //7 8 9 
    //4 5 6 
    //1 2 3
    cells = new Array(b.c1,b.c2,b.c3,b.c4,b.c5,b.c6,b.c7,b.c8,b.c9)
}



function nextTurn(){
    turn = -turn;

    //it's O turn
    if(turn == 1){
        //X is human
        if(document.board.firstMove[0].checked) beginnerMove();
    }else {
        //X's turn and O is human
        if(document.board.firstMove[1].checked) beginnerMove();
    }

    //if (turn == 1){
        
        //if(document.board.p1.selectedIndex == 1) beginnerMove();
        //if(document.board.p1.selectedIndex == 2) intermediateMove();
        //if(document.board.p1.selectedIndex == 3) experiencedMove();
        //if(document.board.p1.selectedIndex == 4) perfectMove();
    //} else {
        //if(document.board.p2.selectedIndex == 1) beginnerMove();
        //if(document.board.p2.selectedIndex == 2) intermediateMove();
        //if(document.board.p2.selectedIndex == 3) experiencedMove();
        //if(document.board.p2.selectedIndex == 4) perfectMove();
    //}
}

function getLegalMoves(state){
    var moves = 0;
    for (var i=0; i<9; i++){
        if ((state & (1<<(i*2+1))) == 0){
            moves |= 1 << i;
        }
    }
    return moves;
}

function moveRandom(moves){
    var numMoves = 0;
    for (var i=0; i<9; i++){
        if ((moves & (1<<i)) != 0) numMoves++;
    }
    if (numMoves > 0){
        var moveNum = Math.ceil(Math.random()*numMoves);
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

function openingBook(state){
    var mask = state & 0x2AAAA;	
    if (mask == 0x00000) return 0x1FF;
	if (mask == 0x00200) return 0x145;
    if (mask == 0x00002 ||
        mask == 0x00020 ||
        mask == 0x02000 ||
        mask == 0x20000) return 0x010;
    if (mask == 0x00008) return 0x095;
    if (mask == 0x00080) return 0x071;
    if (mask == 0x00800) return 0x11C;
    if (mask == 0x08000) return 0x152;
    return 0;
}

function perfectMove(){
    var state = getState();
    var winner = detectWin(state);
    if (winner == 0){
        var moves = getLegalMoves(state);
        var hope = -999;
        var goodMoves = openingBook(state);
        if (goodMoves == 0){
            for (var i=0; i<9; i++){
                if ((moves & (1<<i)) != 0) {
                    var value = moveValue(state, i, turn, turn, 15, 1);
                    if (value > hope){
                        hope = value;
                        goodMoves = 0;
                    }
                    if (hope == value){
                        goodMoves |= (1<<i);
                    }
                }
            }
        }
        moveRandom(goodMoves);
    }
}

function moveValue(istate, move, moveFor, nextTurn, limit, depth){
    var state = stateMove(istate, move, nextTurn);
    var winner = detectWin(state);
    if ((winner & 0x300000) == 0x300000){
        return 0;
    } else if (winner != 0){
        if (moveFor == nextTurn) return 10 - depth;
        else return depth - 10;
    }
    var hope = 999;
    if (moveFor != nextTurn) hope = -999;
    if(depth == limit) return hope;
    var moves = getLegalMoves(state);
    for (var i=0; i<9; i++){
        if ((moves & (1<<i)) != 0) {
            var value = moveValue(state, i, moveFor, -nextTurn, 10-Math.abs(hope), depth+1);
            if (Math.abs(value) != 999){
                if (moveFor == nextTurn && value < hope){
                    hope = value;
                } else if (moveFor != nextTurn && value > hope){
                    hope = value;
                }
            }
        }
    }
    return hope;
}

function detectWinMove(state, cellNum, nextTurn){
    var value = 0x3;
    if (nextTurn == -1) value = 0x2;
    var newState = state | (value << cellNum*2);
    return detectWin(newState);
}

function beginnerMove(){
    var state = getState();
    var winner = detectWin(state);
    if (winner == 0) moveRandom(getLegalMoves(state));
}

function getGoodMove(state){
	var moves = getLegalMoves(state);
    for (var i=0; i<9; i++){
        if ((moves & (1<<i)) != 0) {
            if (detectWinMove(state, i, turn)){
                move(cells[i]);
                return 0;
            }
        }
    }
    for (var j=0; j<9; j++){
        if ((moves & (1<<j)) != 0) {
            if (detectWinMove(state, j, -turn)){
                move(cells[j]);
                return 0;
            }
        }
    }
    return moves;
}


function intermediateMove(){
    var state = getState();
    var winner = detectWin(state);
    if (winner == 0) {
        moveRandom(getGoodMove(state));
    }
}

function experiencedMove(){
    var state = getState();
    var winner = detectWin(state);
    if (winner == 0) {
        var moves = openingBook(state);
        if (state == 0) moves = 0x145;
        if (moves == 0) moves = getGoodMove(state);
        moveRandom(moves);
    }
}

function getState(){
    var state = 0;
    for (var i=0; i<9; i++){
        var cell = cells[i];
        var value = 0;
        if (cell.value.indexOf('X') != -1) value = 0x3;
        if (cell.value.indexOf('O') != -1) value = 0x2;
        state |= value << (i*2);
    }
    return state;
}

function detectWin(state){
    
    //8: x: 0x30000 o: 0x20000 
    //7: x: 0x0c000 o: 0x08000
    //6: x: 0x03000 o: 0x02000
    //5: x: 0x00c00 o: 0x00800 
    //4: x: 0x00300 o: 0x00200       
    //3: x: 0x000c0 o: 0x00080
    //2: x: 0x00030 o: 0x00020
    //1: x: 0x0000c o: 0x00008
    //0: x: 0x00003 o: 0x00002

    

    //789   3f000
    //456   00fc0
    //123   0003f
    //
    //147   030c3
    //258   0c30c
    //369   30c30
    //
    //357   03330
    //159   30303


    if ((state & 0x3F000) == 0x3F000) return 0x13F000;
    if ((state & 0x3F000) == 0x2A000) return 0x22A000;

    if ((state & 0x00FC0) == 0x00FC0) return 0x100FC0;
    if ((state & 0x00FC0) == 0x00A80) return 0x200A80;

    if ((state & 0x0003F) == 0x0003F) return 0x10003F;
    if ((state & 0x0003F) == 0x0002A) return 0x20002A;

    if ((state & 0x030C3) == 0x030C3) return 0x1030C3;
    if ((state & 0x030C3) == 0x02082) return 0x202082;

    if ((state & 0x0C30C) == 0x0C30C) return 0x10C30C;
    if ((state & 0x0C30C) == 0x08208) return 0x208208;

    if ((state & 0x30C30) == 0x30C30) return 0x130C30;
    if ((state & 0x30C30) == 0x20820) return 0x220820;

    if ((state & 0x03330) == 0x03330) return 0x103330;
    if ((state & 0x03330) == 0x02220) return 0x202220;

    if ((state & 0x30303) == 0x30303) return 0x130303;
    if ((state & 0x30303) == 0x20202) return 0x220202;

    //what's this
    if ((state & 0x2AAAA) == 0x2AAAA) return 0x300000;
    return 0;
}       

function recordWin(winner){
    if ((winner & 0x300000) == 0x100000){
        xWon++;
    } else if ((winner & 0x300000) == 0x200000){
        oWon++;
    } else if ((winner & 0x300000) == 0x300000){
        catsGame++;
    }
}

function stateMove(state, move, nextTurn){
    var value = 0x3;
    if (nextTurn == -1) value = 0x2;
    return (state | (value << (move*2)));
}

function move(cell){
    if (cell.value == ''){
        var state = getState();
        var winner = detectWin(state);
        

        //if (winner == 0){
            //for (var i=0; i<9; i++){
                //if (cells[i] == cell){
                    //state = stateMove(state, i, turn);
                //}
            //}
            //nextTurn();
        //}
    }
}

function countMoves(state){
    var count = 0;
    for (var i=0; i<9; i++){
        if ((state & (1<<(i*2+1))) != 0){
           count++;
        }
    }
    return count;
}

function newGame(){
    //var state = getState();
    //var winner = detectWin(state);
    //if (winner == 0 && countMoves(state) > 1){
        //if (turn == 1) oWon++;
        //else xWon++;
    //}

    //-1 X  1 O 
    //if (document.board.firstMove[0].checked=='1'){
        ////turn == -1 means X first
        //turn = -1;
    //} else {
        ////turn == 1 means O first
        //turn = 1;
    //}
    nextTurn();
}

