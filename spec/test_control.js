define(["control"], function(Control){
    describe("The controlpanel", function(){
        var control = {}
        beforeEach(function() {
            var el = {
                newButton: "fake Button",
                playerList: "fake Playerlist"
            
            }
            control = new Control(el);
        })

        it("should have button  and palyerList element", function(){
            expect(control.button).toEqual("fake Button")
            expect(control.plist).toEqual("fake Playerlist")
        
        })
    
    })

})
