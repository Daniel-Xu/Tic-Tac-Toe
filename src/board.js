define(["underscore", "setting"], function(_, setting){
    var wins = setting.wins

    function Board(el) {
        // the element means elements
        this.element = el
        this.state = this.getState()
        this.winner = this.detectWin()
    }

    Board.prototype.getState = function() {
        return _.map(this.element, function(cell, i){
            return cell.value
        })
    }

    Board.prototype.updateState = function(){
        this.state = this.getState()
        this.winner = this.detectWin()
    }

    Board.prototype.isFull = function(){
        return !(_.contains(this.state, ''))
    }


    Board.prototype.clearUpBoard = function(game){
        _.each(this.element, function(cell, i){
            cell.value = ""
            game.render.clearCell(i)
        })
        this.updateState()
    }
    
    Board.prototype.findWinner = function(){
        return  _.find(wins, function(situation){
            return (this.state[situation[0]] === this.state[situation[1]]
                    && this.state[situation[0]] === this.state[situation[2]]
                    && this.state[situation[0]] !== '' && this.state[situation[0]] !== undefined) 
        }, this)
    }

    Board.prototype.detectWin = function(){
        var winner = this.findWinner()
        if(winner !== undefined) return winner
        if(this.isFull(this.state)) return "tie"

        return 0
    }       

    Board.prototype.getLegalMoves = function() {
        var legalMove = []
        _.each(this.state, function(state, i){
            if(state === '') legalMove.push(i)
        })
        return legalMove
    }

    function _getRandom(moves) {
        //moveNum is random num in [0, numMove]
        return moves[Math.floor(Math.random()*(moves.length))]
    }

    Board.prototype.moveRandom = function(game, moves){
        var numMoves = moves.length;
        if (numMoves > 0){
            var moveNum = _getRandom(moves)
            this.element[moveNum].play(game)
        }
    }

    Board.prototype.perfectMove = function(game){
        var moves = game.engine.availabeForPerfectMove(game)
        this.moveRandom(game, moves) 
    }

    return Board
})
