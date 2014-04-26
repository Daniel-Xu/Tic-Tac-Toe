define(["underscore"], function(_){

    var wins = [
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function Board(el) {
        this.element = el
        this.state = this.getState()
        this.winner = this.detectWin()
    }

    Board.prototype.getState = function() {
        return _.map(this.element, function(cell, i){
            return cell.element.value
        })
    }

    Board.prototype.updateState = function(){
        this.state = this.getState()
        this.winner = this.detectWin()
    }

    Board.prototype.isFull = function(){
        if(_.contains(this.state, ''))
            return false
        return true
    }

    function _isArray(obj){
        return Object.prototype.toString.call(obj) === '[object Array]'
    }

    Board.prototype.drawBoard = function(){
        if(_isArray(this.winner)){
            _.each(this.winner, function(index){
                this.element[index].element.style.backgroundColor = 'red'
            }, this)
        } 
        if(this.winner === "tie") alert("It's a tie! Nice try!");
    }

    Board.prototype.clearUpBoard = function(){
        _.each(this.element, function(cell){
            cell.element.value = ""
            cell.element.style.backgroundColor = '#3498db'
        })
        this.updateState()
    }
    
    Board.prototype.getLegalMoves = function() {
        var legalMove = []
        _.each(this.state, function(state, i){
            if(state === '') legalMove.push(i)
        })
        return legalMove
    }

    //need to be modified
    Board.prototype.detectWin = function(){
        var winner = _.find(wins, function(situation){
            return (this.state[situation[0]] === this.state[situation[1]]
              && this.state[situation[0]] === this.state[situation[2]]
              && this.state[situation[0]] !== '') 
        }, this)

        if(winner !== undefined)
            return winner

        if(this.isFull(this.state))
            return "tie"

        return 0
    }       

    return Board
})
