describe('libs', () => {
    beforeEach( () => {
        cy.getFakeData({text:true,person:false, user:true})
    });
    it('Libraries are usable', () => {
        let obj = {
            name: "GeeksforGeeks",
            password: "gfg@1234",
            username: "your_geeks"
        }
        
        // Using the _.omit() method 
        cy.log(_.omit(obj, ['name', 'username']));
        const formatedDate = cy.moment().format('MMMM Do YYYY, h:mm:ss a');
        cy.log(formatedDate)
    });
});