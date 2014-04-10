define(['cell_init'], function(cellsInit){

    var cells = cellsInit.getCells()
    var firstPlayer = cellsInit.getFirstPlayer()
    var secondPlayer = cellsInit.getSecondPlayer()

    function drawState(state){
        var winner = detectWin(state);

        for (var i=0; i<9; i++){
            var value = '';
            if (isCellSet(state, i)){
                if ((state & (1<<(i*2))) != 0){
                    //11,  so it's X
                    value = firstPlayer;
                } else {
                    //10, so it's O
                    value = secondPlayer;
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
        if(winner == 0x300000){
            alert("It's a tie! Nice try!");
        }
    }

    function getState(){
        //because we have "" X O three state for one blank, 
        //so we need 2 bit for each blank.

        var state = 0;
        for (var i=0; i<9; i++){
            var cell = cells[i];
            var value = 0;
            if (cell.value.indexOf(firstPlayer) != -1) value = 0x3;
            if (cell.value.indexOf(secondPlayer) != -1) value = 0x2;
            state |= value << (i*2);
        }
        return state;
    }

    function detectWinMove(state, cellNum, nextTurn){
        var value = 0x3;
        if (nextTurn == -1) value = 0x2;
        var newState = state | (value << cellNum*2);
        return detectWin(newState);
    }

    //just test whether it's blank
    function isCellBlank(state, cellnum)
    {
        return ((state & (1<<(cellnum*2+1))) == 0)
    }

    function isCellSet(state, cellnum)
    {
        return ((state & (1<<(cellnum*2+1))) != 0)
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

    return {
        detectWin: detectWin,
        detectWinMove: detectWinMove,
        isCellBlank: isCellBlank,
        isCellSet: isCellSet,
        getState: getState,
        drawState: drawState
    }
})
