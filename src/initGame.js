define(["cell", "board"], function(cellConstructor, boardConstructor){
    var b = document.board
    var pureCells = new Array(b.c1,b.c2,b.c3,b.c4,b.c5,b.c6,b.c7,b.c8,b.c9)

    var allCells = []
    _.each(pureCells, function(el, i){
        allCells.push(new cellConstructor(el))
    })

    var board = new boardConstructor(allCells)

    return board
})
