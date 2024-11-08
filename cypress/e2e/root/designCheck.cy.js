import {skillsCheck, navAssesment, navClicking, filterActivitiesCheck, exportActivitesCheck, isFound, hoveringState} from '../../support/controller.js';
describe('Design', () => {
    beforeEach(() => {
        cy.getAll()
        cy.visit('');
    });
    it('Clicks on nav', () => {
        navAssesment();
        navClicking();
        filterActivitiesCheck();
        exportActivitesCheck();
    });
    it('Skills are correct', () => {
        cy.clickPCNav('Skills');
        skillsCheck();
    })
    it.only('nav hoverings', () => {
        hoveringState();
    });
    it('Toggling menus', () => {
    });
    it('filtering is ok', ()=>{
        isFound();
    })
});