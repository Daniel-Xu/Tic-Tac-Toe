define(["game"], function(Game){

    describe("The game", function(){
        var game = {}
        beforeEach(function() {
            spyOn(Game.prototype, "createBoard")
            spyOn(Game.prototype, "createControlPanel")
            spyOn(Game.prototype, "createEngine")
            spyOn(Game.prototype, "listenFromUser")
            game = new Game()
            game.board = jasmine.createSpyObj("board", ["clearUpBoard", "perfectMove"])
        })

        it("should create board, create control panel, create engine and listen from user during the initilization", function(){
            expect(Game.prototype.createBoard).toHaveBeenCalled()
            expect(Game.prototype.listenFromUser).toHaveBeenCalled()
            expect(Game.prototype.createControlPanel).toHaveBeenCalled()
            expect(Game.prototype.createEngine).toHaveBeenCalled()
        })

        it("new game should clear board and changeTurn", function(){
            spyOn(game, "changeTurn")
            game.newGame()
            expect(game.changeTurn).toHaveBeenCalled()
        })

    })
})
