define(["underscore"], function(_){

    var b = document.board;
    cells = new Array(b.c1,b.c2,b.c3,b.c4,b.c5,b.c6,b.c7,b.c8,b.c9)

    function Cell(el) {
        this.element = el
        this.element.addEventListener("click", _.bind(this._handleClick, this))  

    }

    Cell.prototype._handleClick = function(){
        //operation.move(this)
        this._move()
    }

    Cell.prototype._move = function(){
        if (this.element.value == ''){
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

    return Cell
})
