define(["underscore", "cell"], function(_, cell){

    function Board(el) {
        this.element = el
        this.state = this._getState()
    }

    Board.prototype._getState = function() {
        var state = [];
        _.each(this.element, function(cell, i){
            state.push(cell.element.value)
        })

        return state;
    }

    return Board;

})
