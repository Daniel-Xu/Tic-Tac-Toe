define(["underscore", "cell", "board", "control", "engine","render","setting"], function(_, CellConstructor, BoardConstructor, ControlConstructor, EngineConstructor, RenderConstructor, setting){
    var turnEnum = setting.turnEnum
    var playerSymbol = setting.playerSymbol
    var pureCells = setting.pureCells

    function Game() {
        this.currentPlayer = turnEnum.secondPlayer
        this.board = this.createBoard(pureCells)
        this.engine = this.createEngine()
        this.render = this.createRender()
        this.render.handleDomListener(this)
    }

    function _domToCell(cells) {
        return _.map(cells, function(el, i){
            return new CellConstructor(el, i)
        })
    }

    Game.prototype.createRender = function() {
        return new RenderConstructor() 
    }

    Game.prototype.createBoard = function(pureCells) {
        return new BoardConstructor(_domToCell(pureCells))
    }

    Game.prototype.createEngine = function() {
        return new EngineConstructor()
    }


    Game.prototype.currentPlayerSymbol = function(player) {
        return player === turnEnum.firstPlayer ? 
                playerSymbol.firstPlayerSymbol :playerSymbol.secondPlayerSymbol
    }

    Game.prototype.newGame = function(){
        this.currentPlayer = turnEnum.secondPlayer;
        this.board.clearUpBoard(this)
        this.changeTurn()
    }

    Game.prototype.changeTurn = function changeTurn(){
        this.currentPlayer = - this.currentPlayer;

        if(this.currentPlayer === turnEnum.firstPlayer){
            if(document.board.real[1].checked) this.board.perfectMove(this);
        }else {
            if(document.board.real[0].checked) this.board.perfectMove(this);
        }
    }

    return Game
})
