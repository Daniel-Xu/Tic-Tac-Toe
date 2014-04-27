define(["cell"], function(Cell){

    describe("A cell", function(){
        var cell = {}
        var cellELe = _createElement('<td class="cell"><input type="button"  value="" ></td>')
        beforeEach(function() {
            cell = new Cell(cellELe)
        })
        afterEach(function(){
            cell.element.value = ''
        })

        it("should be constructed by correct element", function() {
            expect(cell.element).toEqual(cellELe)
        });

        it("value should be blank when first be created", function(){
            expect(cell.element.value).toEqual('')
        })

        it("should be true for cell's isBlank", function(){
            expect(cell.isBlank()).toBeTruthy()
        })

        it("should be false for cell's isSet", function(){
            expect(cell.isSet()).toBeFalsy()
        })

        it("shoud change the value of element in drawCell", function(){
            cell.drawCell("X")
            expect(cell.element.value).toEqual("X")
        })

        it("should call drawCell drawBoard updateState changeTurn  inside of play", function(){

            var game = {
                changeTurn: jasmine.createSpy("game changeturn"),
                currentPlayerSymbol: jasmine.createSpy("game symbol"),
                board: {
                    winner: 0, 
                    updateState: jasmine.createSpy("board"),
                    drawBoard: jasmine.createSpy("board")
                }
            }

            spyOn(cell, "drawCell")
            cell.play(game)

            expect(cell.drawCell).toHaveBeenCalled()
            expect(game.changeTurn).toHaveBeenCalled()
            expect(game.board.drawBoard).toHaveBeenCalled
            expect(game.board.updateState).toHaveBeenCalled()
        })
    
    })

})
