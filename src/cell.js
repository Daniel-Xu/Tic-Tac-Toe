define(["underscore"], function(_){
    function Cell(el) {
        this.element = el
    }

    Cell.prototype.isBlank = function(){
        return this.element.value === ""
    }

    Cell.prototype.isSet = function(){
        return this.element.value !== ""
    }

    Cell.prototype.drawCell = function(currentPlayerValue) {
        this.element.value = currentPlayerValue
    }


    return Cell
})
