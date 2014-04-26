define(["underscore"], function(_){

    function Engine() {}
    
    Engine.prototype.availabeForPerfectMove = function(game){
        var currentPlayer = game.currentPlayer
        var board = game.board
        var winner = board.winner

        if (winner == 0){
            var moves = board.getLegalMoves();
            var hope = -999;
            var goodMoves = _knownStrategy(board.state)
            
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

            return goodMoves
        }
    }

   
    function _isJustOneSet(state, i){
        var remainEle =  _.without(state, state[i])
        var isRemainsBlank = _.every(remainEle, function(ele, i){
            return ele === ''
        })

        return ((state[i] !== "") && isRemainsBlank)
    }

    function _isJustOneCornerSet(state) {
        return (_isJustOneSet(state, 0) || _isJustOneSet(state,2)
                || _isJustOneSet(state, 6) || _isJustOneSet(state, 8))
    }

    function _knownStrategy(state){
        if(state.join("") === "") 
            return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        if(_isJustOneSet(state, 4)) 
            return [0, 2, 6, 8] 
        if(_isJustOneCornerSet(state))
            return [4]

        if(_isJustOneSet(state, 1))
            return [0, 2, 4, 7]
        if(_isJustOneSet(state, 3))
            return [0,4, 5,6]
        if(_isJustOneSet(state, 5))
            return [2, 3, 4, 8]
        if(_isJustOneSet(state, 7))
            return [1, 4, 6, 8]

        return [];
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
