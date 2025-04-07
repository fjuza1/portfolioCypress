import {skillsCheck, navAssesment, navClicking, filterActivitiesCheck, exportActivitesCheck, isFound, hoveringState} from '../../support/controller.js';
describe('Design', () => {
    beforeEach(() => {
        cy.getAll()
        cy.visit('');
    });
    it.only('Clicks on nav', () => {
        navAssesment();
        filterActivitiesCheck();
        exportActivitesCheck();
        navClicking();
    });
    it('Skills are correct', () => {
        cy.clickPCNav('Skills');
        skillsCheck();
    })
    it('nav hoverings', () => {
        hoveringState();
    });
    it('Toggling menus', () => {
    });
    it('filtering is ok', ()=>{
        isFound();
    })
});