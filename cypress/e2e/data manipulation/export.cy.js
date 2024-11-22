describe('Exporting data', () => {
    beforeEach(() => {
        cy.getAll()
        cy.visit('');
    });
    it('Exporting skills', () => {
        cy.randomFixData('skills.json');
    });
});