define(["underscore", "cell", "board", "control", "engine"], function(_, CellConstructor, BoardConstructor, ControlConstructor, EngineConstructor){

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
        this.engine = this.createEngine()
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

    Game.prototype.createEngine = function() {
        return new EngineConstructor()
    }

    Game.prototype.createControlPanel = function(controlPanel) {
        var panel =  new ControlConstructor(controlPanel)
        this.changePlayerList()
        return panel
    }

    Game.prototype.changePlayerList = function() {
        var player1 = document.getElementById('player1')
        var player2 = document.getElementById('player2')
        player1.innerHTML = playerSymbol.firstPlayerSymbol
        player2.innerHTML = playerSymbol.secondPlayerSymbol
    }

    Game.prototype.listenFromBoard = function(){
        _.each(this.board.element, function(cell, i){
            cell.element.addEventListener("click", _.bind(cell.play, cell, this))
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

    Game.prototype.currentPlayerSymbol = function(player) {
        return player === turnEnum.firstPlayer ? 
                playerSymbol.firstPlayerSymbol :playerSymbol.secondPlayerSymbol
    }

    Game.prototype.newGame = function(){
        this.currentPlayer = turnEnum.secondPlayer;
        this.board.clearUpBoard()
        this.changeTurn()
    }

    Game.prototype.changeTurn = function changeTurn(){
        this.currentPlayer = - this.currentPlayer;

        if(this.currentPlayer === turnEnum.firstPlayer){
            if(document.board.real[1].checked) this.engine.perfectMove(this);
        }else {
            if(document.board.real[0].checked) this.engine.perfectMove(this);
        }
    }

    return {
        Game: Game, 
        turnEnum: turnEnum
    }
})
