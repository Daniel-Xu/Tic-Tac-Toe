define(["board"], function(Board){
    it("it should call _getState during the initilization", function(){
        spyOn(Board.prototype, "_getState")
        var board = new Board()
        expect(Board.prototype._getState).toHaveBeenCalled()
    });

})
