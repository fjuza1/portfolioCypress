import {DATAADJUSTCRIT} from '../../support/config';
describe('Filtering data', () => {
    beforeEach(() => {
        cy.getAll();
        cy.visit(Cypress.env('skillsUrl'));
    });
    it('Filtering skills - input field', () => {
        cy.randomFixData('skills.json');
        cy.get('@randomData').should('not.be.empty').then(function (skill){
            cy.wrap(skill).as('skill')
            cy.get('@skill').then((skill)=>{
                cy.get('@formActivities').find('#searchName').then(data => {
                    cy.wrap(data).type(skill?.name ?? cy.error('Error has occured.Please fix!'),{force:true})
                    cy.get('@skillsContainer').children().should('have.length.greaterThan', 0)
                })
            })
        })
    });
    it('Filtering Skills Dropdown',()=>{
        cy.randomFixData('skills.json');
        cy.get('@randomData').should('not.be.empty').then(function (skill){
            cy.get('@formActivities').find('select').select(skill?.level ?? cy.error('Error has occured. Please fix!'), {force:true})
            cy.get('@skillsContainer').children().should('have.length.greaterThan', 0)
            cy.get('div[role="progressbar"]').each((skillLevel)=>{
                const text = skillLevel.text();
                cy.wrap(skillLevel).should('contain', skill.level)
            })
        })
    })
    it.only('Filtering skills to non-existant skill',()=>{
        cy.get('@filterCollapseBTN').scrollIntoView({easing:'linear',offset:{top:500}}).click();
        cy.get('@filterLevelEl').select(1);
        cy.get('@skillsContainer').should('be.visible')
        .and('not.contain', 'No skills found. Please try again.')
        .and('contain', DATAADJUSTCRIT)
        /*
        Error message will be changed 
        .and('not.contain','No skills were found! Please try again.')
        .and('contain', 'No skills found. Please adjust your filter criteria.')
        */ 
    });
});