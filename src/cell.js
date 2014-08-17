define(["underscore"], function(_){
    function Cell(el,i) {
        //this.element = el
        this.value = el
        this.index = i
    }

    Cell.prototype.isBlank = function(){
        return this.value === ""
    }

    Cell.prototype.isSet = function(){
        return this.value !== ""
    }

    Cell.prototype.updateValue = function(currentPlayerValue) {
        this.value = currentPlayerValue
    }

    Cell.prototype.play = function(game){
        if (this.value === '' && game.board.winner === 0){
            this.updateValue(game.currentPlayerSymbol(game.currentPlayer))

            game.board.updateState()
            game.render.drawCell(game, this.index)
            game.render.drawWhenWinnerOccurs(game)
            game.changeTurn()

        }
    }

    return Cell
})
