define(["cell"], function(Cell){

    var cell = {};
    beforeEach(function() {
        var s = "<h1>hello</h1>"
        var div = document.createElement("div")
        div.innerHTML = s
        var cellEle = div.firstChild

        cell = new Cell(cellEle);
    })

    it("it should constructed by correct element", function() {
        expect(cell.element.innerHTML).toEqual("hello")
    });

})
