var turn = -1,
    tie = 0,
    oWin = 0,
    xWin = 0;
var cells;


function drawCells(){
    var b = document.board;

    //cells are 9 button
    //7 8 9 
    //4 5 6 
    //1 2 3
    cells = new Array(b.c1,b.c2,b.c3,b.c4,b.c5,b.c6,b.c7,b.c8,b.c9)
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


function getState(){
    //because we have "" X O three state for one blank, 
    //so we need 2 bit for each blank.

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

    //&3000000 == 3000000 tie
    ///&3000000 == 2000000 owin
    ///&3000000 == 1000000 xwin

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

    //this is tie situation, because 0x03 and 0x02 both have 1 bit of 1, so we check if 
    //all the 1 bit exist in 9 blank, we can be sure that it's a tie
    if ((state & 0x2AAAA) == 0x2AAAA) return 0x300000;
    return 0;
}       

//function recordWin(winner){
    //if ((winner & 0x300000) == 0x100000){
        //xWon++;
    //} else if ((winner & 0x300000) == 0x200000){
        //oWon++;
    //} else if ((winner & 0x300000) == 0x300000){
        //tie++;
    //}
//}

function stateMove(state, move, nextTurn){
    var value = 0x3;
    if (nextTurn == -1) value = 0x2;
    return (state | (value << (move*2)));
}

function nextTurn(){
    turn = -turn;
    if(turn == 1){
        if(document.board.real[1].checked) perfectMove();
    }else {
        if(document.board.real[0].checked) perfectMove();
    }
}

function move(cell){
    if (cell.value == ''){
        var state = getState();
        var winner = detectWin(state);

        if (winner == 0){
            for (var i=0; i<9; i++){
                if (cells[i] == cell){
                    state = stateMove(state, i, turn);
                }
            }
            drawState(state);
            nextTurn();
        }
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

function drawState(state){
    var winner = detectWin(state);

    for (var i=0; i<9; i++){
        var value = '';
        if ((state & (1<<(i*2+1))) != 0){
            if ((state & (1<<(i*2))) != 0){
                //11,  so it's X
                value = 'X';
            } else {
                //10, so it's O
                value = 'O';
            }
        }

        //paint the winner red background
        if ((winner & (1<<(i*2+1))) != 0){
            cells[i].style.backgroundColor='red';
        } else {
            if (cells[i].style.backgroundColor == "red"){
                cells[i].style.backgroundColor='#3498db';
            }
        }

        cells[i].value = value;
    }
}

function newGame(){
    turn = -1;
    drawState(0);
    nextTurn();
}

