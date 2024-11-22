describe('Contact form validation', () => {
    beforeEach(() => {
        cy.getAll()
        cy.visit('');
    });
    it('Contact form - input fields', () => {
        cy.randomFixData('skills.json');
    });
});