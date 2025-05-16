import {skillsCheck, navAssesment, navClicking, filterActivitiesCheck, exportActivitesCheck, isFound, hoveringState} from '../../support/controller.js';
describe('Design', () => {
    beforeEach(() => {
        cy.getAll()
        cy.visit('');
    });
    /*
    it('Clicks on nav', () => {
        navAssesment();
        filterActivitiesCheck();
        exportActivitesCheck();
        navClicking();
    });
    it.only('Skills are correct', () => {
        cy.clickPCNav('Personal');
        skillsCheck();
    })*/
    it('nav hoverings', () => {
        hoveringState();
    });
    it('Toggling menus', () => {
    });
    it('filtering is ok', ()=>{
        isFound();
    })
    it('DarkLightModeWorks', () => {
        cy.checkLightDarkMode();
    })
});