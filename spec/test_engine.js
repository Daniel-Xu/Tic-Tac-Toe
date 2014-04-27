define(["engine"], function(Engine){
    describe("The engine", function(){
        it("cloneboard is deep clone for state", function(){
            var board = {
                state: ["", ""], 
            }

            var newBoard = _.extend({state: []}, board)
            newBoard.state = board.state.slice(0)
            newBoard.state[0] = "X"
            expect(newBoard.state).toEqual(["X", ""])
            expect(board.state).toEqual(["", ""])
            
        })
    
    })

})
