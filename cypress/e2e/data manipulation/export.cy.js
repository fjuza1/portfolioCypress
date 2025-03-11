describe('Exporting data', () => {
    beforeEach(() => {
        cy.goSkills();
        cy.getAll()
    });
    it('Exporting skills - json', () => {
        cy.get('@exportButton').click();
        cy.get('@exportInps').should('have.length', 3)
        .and('exist')
        .eq(0)
        .click();
/*
        cy.checkIfJSON('').then((response) => cy.wrap(response).as('skillsJSON'));
        cy.get('@skillsJSON').should('be.an', 'boolean').and('be.false');
        */
    });
});