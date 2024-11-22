describe('Form validation', () => {
    beforeEach(() => {
        cy.getAll()
        cy.visit('');
    });
    it('Form validation -  input fields', () => {
        cy.randomFixData('skills.json');
    });
});