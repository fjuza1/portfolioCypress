describe('Sorting data', () => {
    beforeEach(() => {
        cy.getAll()
        cy.visit('');
    });
    it('Sorting skills', () => {
        // get SkillsData
        cy.randomFixData('skills.json');
                
        //TODO sort by name asc
        //TODO sort by name desc

        //TODO sort by level asc
        //TODO sort by level desc
    })
    it('Sorting filtered skills', () => {
        // get SkillsData
        cy.randomFixData('skills.json');

        //TODO filter skills search input, sort by name asc

        //TODO filter skills search input, sort by name desc

        //TODO filter skills search input, sort by level asc

        //TODO filter skills search input, sort by level desc
        
        //TODO filter skills search dropdown, sort by name asc

        //TODO filter skills search dropdown, sort by name desc
    })
});