describe('Sorting data', () => {
    before(() => {
        cy.fixture('skills.json').then(skills => cy.wrap(skills.map(skill => skill.name).slice(0,Cypress.env('results'))).as('skillsReseted'));
    })
    beforeEach(() => {
        cy.getAll();
        cy.visit(Cypress.env('skillsUrl'));
        cy.get('@skillsContainer').getSkillsTextArray().then((prevSkills)=>cy.wrap(prevSkills).as('skillsOriginal'));
        cy.goSkills();
    });
    it.only('Sorting skills', () => {
        // get SkillsData
        cy.randomFixData('skills.json');
                
        //sort by name asc
        cy.randomFixData('skills.json');
        cy.get('@filterCollapseBTN').scrollIntoView({easing:'linear',offset:{top:500}}).click();
        // before was sorted by name asc
        cy.getInitSkills();
        // after sorting by name asc
        cy.get('@sortButton').first().click();
        cy.get('@skillsContainer').getSkillsTextArray().then((skills)=>cy.wrap(skills).as('skillsSortedAsc'))

        // comparing sorted data from UI
        cy.get('@skillsInit').then((skillsInit) => {
            cy.get('@skillsSortedAsc').then((skillsSortedAsc) => {
              expect(skillsInit).to.not.deep.equal(skillsSortedAsc);
            });
          });
        cy.get('@skillsContainer').scrollIntoView({easing:'linear'})
        //sort by name desc
          cy.get('@descBTN').click();
        cy.getInitSkills();
          cy.get('@sortButton').first().click();
          cy.get('@skillsContainer').getSkillsTextArray().then((skills)=>cy.wrap(skills).as('skillsSortedDesc'))
                  // comparing sorted data from UI
            cy.get('@skillsInit').then((skillsInit) => {
                cy.get('@skillsSortedDesc').then((skillsSortedAsc) => {
                expect(skillsInit).to.not.deep.equal(skillsSortedAsc);
                });
            });
        //sort by level asc
        cy.get('@ascBTN').click();
        cy.get('@levelBTN').click();
        cy.getInitSkills();
        cy.get('@sortButton').first().click();
        cy.get('@skillsContainer').getSkillsTextArray().then((skills)=>cy.wrap(skills).as('skillsNameSortedDesc'))
        // comparing sorted data from UI
        cy.get('@skillsInit').then((skillsInit) => {
          cy.get('@skillsNameSortedDesc').then((skillsSortedAsc) => {
            expect(skillsInit).to.not.deep.equal(skillsSortedAsc);
          });
        });
        //sort by level desc
        cy.get('@levelBTN').click();
        cy.get('@descBTN').click();
        cy.getInitSkills();
        cy.get('@sortButton').first().click();
        cy.get('@skillsContainer').getSkillsTextArray().then((skills)=>cy.wrap(skills).as('skillsLevelSortedDesc'))
        cy.get('@skillsInit').then((skillsInit) => {
            cy.get('@skillsLevelSortedDesc').then((skillsSortedAsc) => {
              expect(skillsInit).to.not.deep.equal(skillsSortedAsc);
            });
          });
        // reseted data
        cy.getInitSkills();
        cy.get('@resetButton').click();
        cy.get('@skillsContainer').getSkillsTextArray().then((skills)=>cy.wrap(skills).as('skillsResetedSortedDesc'))
        // comparing sorted data from UI
        cy.get('@skillsInit').then((skillsInit) => {
            cy.get('@skillsReseted').then((skillsSortedAsc) => {
              expect(skillsInit).to.not.deep.equal(skillsSortedAsc);
            });
          });
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