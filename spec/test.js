describe("presentation", function(){
    //beforeEach(function(){
        //this.addMatchers({
            //toBeInitialized:function(params){
                //return this.actual =

            //}
        //})

    //})

    it("should show the first player name", function(){
        expect(getFirstPlayer()).toEqual("F")
    })

    it("should show the second player name", function(){
        expect(getSecondPlayer()).toEqual("K")
    })
})
