define(["underscore", "cell", "board", "control"], function(_, CellConstructor, BoardConstructor, ControlConstructor){

    var turnEnum = {
        firstPlayer:  1,
        secondPlayer: -1
    }

    var playerSymbol = {
        firstPlayerSymbol: "X", 
        secondPlayerSymbol: "O"
    }


    function Game(cells, controlPanel) {
        this.currentPlayer = turnEnum.secondPlayer
        this.board = this.createBoard(cells)
        this.controlPanel = this.createControlPanel(controlPanel)
        this.listenFromUser()
    }

    function _domToCell(cells) {
        return _.map(cells, function(el){
            return new CellConstructor(el)
        })
    }

    Game.prototype.createBoard = function(pureCells) {
        return new BoardConstructor(_domToCell(pureCells))
    }

    Game.prototype.createControlPanel = function(controlPanel) {
        return new ControlConstructor(controlPanel)
    }

    Game.prototype.listenFromBoard = function(){
        _.each(this.board.element, function(cell, i){
            cell.element.addEventListener("click", _.bind(this.play, cell, this))
        }, this)
    }
    Game.prototype.listenFromPanel = function(){
        _.each(this.controlPanel.plist, function(playerOpt, i){
            playerOpt.addEventListener("change", _.bind(this.newGame, this))
        }, this)
        this.controlPanel.button.addEventListener('click', _.bind(this.newGame, this))
    }

    Game.prototype.listenFromUser = function(){
        this.listenFromBoard()
        this.listenFromPanel()
    }

    Game.prototype.play = function(game){
        if (this.element.value === '' && game.board.winner === 0){
            this.drawCell(game.currentPlayerSymbol(game.currentPlayer))
            game.board.updateState()
            game.board.drawBoard()
            game.changeTurn()
        }
    }

    Game.prototype.currentPlayerSymbol = function(player) {
        return player === turnEnum.firstPlayer ? 
                playerSymbol.firstPlayerSymbol :playerSymbol.secondPlayerSymbol
    }

    Game.prototype.newGame = function(){
        this.currentPlayer = turnEnum.secondPlayer;
        this.board.clearUpBoard()
    }

    Game.prototype.changeTurn = function changeTurn(){
        this.currentPlayer = - this.currentPlayer;

        if(this.currentPlayer === turnEnum.firstPlayer){
            if(document.board.real[1].checked) perfectMove();
        }else {
            if(document.board.real[0].checked) perfectMove();
        }
    }

    return {
        Game: Game, 
        turnEnum: turnEnum
    }
})
