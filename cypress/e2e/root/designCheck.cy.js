import {skillsCheck, navAssesment, navClicking, filterActivitiesCheck, exportActivitesCheck} from '../../support/controller.js';
describe('Design', () => {
    before(() => {
        cy.getAll()
    });
    beforeEach(() => {
        cy.visit('');
    });
    it('Clicks on nav', () => {
        navAssesment();
        navClicking();
        filterActivitiesCheck();
        exportActivitesCheck();
    });
    it.only('Skills are correct', () => {
        cy.clickPCNav('Skills');
        skillsCheck();
        cy.get('@formActivities').getFormFields()
    })
    it('Toggling menus', () => {
    });
});