describe('Sorting data', () => {
    beforeEach(() => {
        cy.getAll();
        cy.visit(Cypress.env('skillsUrl'));
        cy.get('@skillsContainer').getSkillsTextArray().then((prevSkills)=>cy.wrap(prevSkills).as('skillsOriginal'));
    });
    it.only('Sorting skills', () => {
        // get SkillsData
        cy.randomFixData('skills.json');
                
        //TODO sort by name asc
        cy.randomFixData('skills.json');
        cy.get('@filterCollapseBTN').scrollIntoView({easing:'linear',offset:{top:500}}).click();
        // before was sorted by name asc
        cy.get('@skillsContainer').getSkillsTextArray().then((skills)=>cy.wrap(skills).as('skillsInit'))
        // after sorting by name asc
        cy.get('@sortButton').first().click();
        cy.get('@skillsContainer').getSkillsTextArray().then((skills)=>cy.wrap(skills).as('skillsSortedAsc'))

        // comparing sorted data from UI
        cy.get('@skillsInit').then((skillsInit) => {
            cy.get('@skillsSortedAsc').then((skillsSortedAsc) => {
              expect(skillsInit).to.not.deep.equal(skillsSortedAsc);
            });
          });
                   
        //TODO sort by name desc

        //TODO sort by level asc
        //TODO sort by level desc

        // TODO reseted data
        /*
        cy.get('@sortButton').first().click();
        cy.get('@skillsContainer').getSkillsTextArray().then((skills)=>cy.wrap(skills).as('skillsReseted'))
        */
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