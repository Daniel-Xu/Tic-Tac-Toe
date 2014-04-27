define(["board"], function(Board){

    describe("The board", function(){
        var board = {}
        beforeEach(function() {
            var cell1 = {
                element: _createElement('<input type="button"  value="">'), 
            }
            var cell2 = {
                element: _createElement('<input type="button"  value="">')
            
            }
            var cell3 = {
                element: _createElement('<input type="button"  value="">')
            }

            var cell4 = {
                element: _createElement('<input type="button"  value="">')
            }
            var cell5 = {
                element: _createElement('<input type="button"  value="">')
            
            }
            var cell6 = {
                element: _createElement('<input type="button"  value="">')
            }
            var cell7 = {
                element: _createElement('<input type="button"  value="">')
            
            }
            var cell8 = {
                element: _createElement('<input type="button"  value="">')
            }
            var cell9 = {
                element: _createElement('<input type="button"  value="">')
            }
            board = new Board([cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9])
        })

        afterEach(function(){
            board.clearUpBoard()
        })



        it("should call getState and detectWin during the initilization", function(){
            spyOn(Board.prototype, "getState")
            spyOn(Board.prototype, "detectWin")
            var newBoard = new Board()

            expect(Board.prototype.getState).toHaveBeenCalled()
            expect(Board.prototype.detectWin).toHaveBeenCalled()
        })

        it("should return an array of getState", function(){
            expect(board.getState()).toEqual(["", "", "", "", "", "", "", "", ""])
        })

        it("should return correct state when the cell's value is changed", function(){
            board.element[0].element.value = "X"
            expect(board.getState()).toEqual(["X", "", "", "", "", "", "", "", ""])
        }) 

        it("should call getState and detectWin inside of updateState", function(){
            spyOn(board, "getState")
            spyOn(board, "detectWin")
            board.updateState()

            expect(board.getState).toHaveBeenCalled()
            expect(board.detectWin).toHaveBeenCalled()
        })
    
        it("should return true when board is full or false when it's not", function(){
            board.state = ["X", "O", "X"]
            expect(board.isFull()).toBeTruthy()

            board.state = ["", "", ""]
            expect(board.isFull()).toBeFalsy()
        })

        it("should call updateState in clearUpBoard", function(){
            spyOn(board, "updateState")
            
            board.element[0].element.value = "X"
            board.clearUpBoard()
            expect(board.element[0].element.value).not.toEqual("X")

            expect(board.updateState).toHaveBeenCalled()
        } )

        it("should return undefine or array of findWinner", function(){
            board.element[0].element.value = "X"
            board.element[1].element.value = "X"
            board.element[2].element.value = "X"
            board.updateState()
            expect(board.findWinner()).toEqual([0, 1, 2])

            board.element[2].element.value = ""
            board.updateState()
            expect(board.findWinner()).toBeUndefined()
        })

        it("should call findWinner inside of detectWin", function(){
            spyOn(board, "findWinner")
            board.detectWin()
            expect(board.findWinner).toHaveBeenCalled()
        })
       
        it("should return 0  or array or tie depending on different input of detectWin", function(){
            board.state = ["", "", "", "", "", "", "", "", "", ""]
            expect(board.detectWin()).toEqual(0)
             
            board.state = ["X", "X", "X", "", "", "", "", "", ""]
            expect(board.detectWin()).toEqual([0, 1, 2])
             
            board.state = ["O", "X", "X", "", "O", "", "", "", "O"]
            expect(board.detectWin()).toEqual([0, 4, 8])

            board.state = ["O", "X", "O", "O", "X", "X", "X", "O", "O"]
            expect(board.detectWin()).toEqual("tie")
        }) 

        it("should call play when moves is larger than 0", function(){
            board.element[0].play = jasmine.createSpy("play")

            board.moveRandom({}, [0])
            expect(board.element[0].play).toHaveBeenCalled()
        })

        it("should call moveRandom inside of perfectMove", function(){
            var game = {
                engine: {
                    availabeForPerfectMove: jasmine.createSpy("Perfect Move")
                }
            }
            spyOn(board, "moveRandom")
            board.perfectMove(game)
            expect(board.moveRandom).toHaveBeenCalled()
            
        })

    })




})
