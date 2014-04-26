define(["underscore"], function(_){

    function Engine() {

    }
    
    function _getRandom(moves) {
        //moveNum is random num in [0, numMove]
        return moves[Math.floor(Math.random()*(moves.length))]
    }

    Engine.prototype.moveRandom = function(game, moves){
        var numMoves = moves.length;
        if (numMoves > 0){
            var moveNum = _getRandom(moves)
            game.board.element[moveNum].play(game)
        }
    }
   
    Engine.prototype.perfectMove = function(game){
        var currentPlayer = game.currentPlayer
        var board = game.board
        var winner = board.winner

        if (winner == 0){
            var moves = board.getLegalMoves();
            var hope = -999;
            //var goodMoves = knownStrategy(state)
            var goodMoves = []
            
            if (goodMoves.length === 0){
                _.each(moves, function(i, index){
                    var value = _moveValue(board, i, currentPlayer, currentPlayer, 1);
                    if (value > hope){
                        hope = value;
                        goodMoves = [];
                    }

                    if (hope == value){
                        goodMoves.push(i);
                    }
                })
            }
            this.moveRandom(game, goodMoves);
        }
    }

    function _moveValue(board, move, originalPlayer, currentPlayer, depth){
        var newBoard = _.extend({state: []}, board)
        newBoard.state = board.state.slice(0)
        newBoard.state[move] = currentPlayer === 1 ? 'X' : 'O'
        var winner =  newBoard.detectWin()

        if (winner == 'tie'){
            return 0;
        } else if (winner != 0){
            if (originalPlayer == currentPlayer) return 10 - depth;
            else return depth - 10;
        }
        
        var hope = 999;
        if (originalPlayer != currentPlayer) hope = -999;
        var moves = newBoard.getLegalMoves();

        _.each(moves, function(i, index){
            var value = _moveValue(newBoard, i, originalPlayer, -currentPlayer,  depth+1);
            if (originalPlayer == currentPlayer && value < hope  
                ||originalPlayer != currentPlayer && value > hope ){

                hope = value;
            }            
        })

        return hope;

    }


    return Engine
})
