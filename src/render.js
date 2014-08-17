define(["underscore", "control", "setting"], function(_, ControlConstructor, setting){

    var domCells = setting.domCells
    var controlPanel = setting.controlPanel
    var playerSymbol = setting.playerSymbol

    function Render() {
        this.elements = domCells
        this.controlPanel = this.createControlPanel(controlPanel)
    }

    function _isArray(obj){
        return Object.prototype.toString.call(obj) === '[object Array]'
    }

    Render.prototype.drawCell = function(game, index) {
        console.log(index)
        this.elements[index].value =  game.board.state[index]
    }

    Render.prototype.clearCell = function(index){
        this.elements[index].value = ""
        this.elements[index].style.backgroundColor = '#3498db'
    }
    
    Render.prototype.drawWhenWinnerOccurs = function(game) {
        if(_isArray(game.board.winner)){
            _.each(game.board.winner, function(index){
                this.elements[index].style.backgroundColor = 'red'
            }, this)
        } 
        if(game.board.winner === "tie") alert("It's a tie! Nice try!");
    }

    Render.prototype.handleDomListener = function(game) {
        this.listenFromBoard(game)
        this.listenFromPanel(game)
    }

    Render.prototype.listenFromBoard = function(game){
        _.each(domCells, function(cell, i){
            var cellObj = game.board.element[i]
            cell.addEventListener("click", _.bind(cellObj.play, cellObj, game))
        })
    }

    Render.prototype.listenFromPanel = function(game){
        //rember to bind, although here has game, but it's just a function -> game.newGame
        _.each(this.controlPanel.plist, function(playerOpt, i){
            playerOpt.addEventListener("change", _.bind(game.newGame, game))
        })

        this.controlPanel.button.addEventListener('click', _.bind(game.newGame, game))
    }

    Render.prototype.createControlPanel = function(controlPanel) {
        var panel =  new ControlConstructor(controlPanel)
        this.changePlayerList()
        return panel
    }

    Render.prototype.changePlayerList = function() {
        var player1 = document.getElementById('player1')
        var player2 = document.getElementById('player2')
        player1.innerHTML = playerSymbol.firstPlayerSymbol
        player2.innerHTML = playerSymbol.secondPlayerSymbol
    }

    return Render

})
