define(["underscore"], function(_){
    function Cell(el) {
        this.element = el
    }

    Cell.prototype.isBlank = function(){
        return this.element.value === ""
    }

    Cell.prototype.isSet = function(){
        return this.element.value !== ""
    }

    Cell.prototype.drawCell = function(currentPlayerValue) {
        this.element.value = currentPlayerValue
    }

    Cell.prototype.play = function(game){
        if (this.element.value === '' && game.board.winner === 0){
            this.drawCell(game.currentPlayerSymbol(game.currentPlayer))
            game.board.updateState()
            game.board.drawBoard()
            game.changeTurn()
        }
    }

    return Cell
})
