import {skillsCheck, navAssesment, navClicking, filterActivitiesCheck, exportActivitesCheck} from '../../support/controller.js';
describe('Design', () => {
    before(() => {
        cy.getAll()
    });
    beforeEach(() => {
        cy.visit('');
    });
    it.only('Clicks on nav', () => {
        navAssesment();
        navClicking();
        filterActivitiesCheck();
        exportActivitesCheck();
    });
    it('Skills are correct', () => {
        skillsCheck();
    })
    it('Toggling menus', () => {
    });
});