describe('Implemented code workings', () => {
    it('Code is working', () => {
        //json
        cy.checkIfJSON('').then((response) => cy.wrap(response).as('skillsJSON'));
        cy.get('@skillsJSON').should('be.an', 'boolean').and('be.false');
        //xml
        cy.checkIfXML('').then((response) => cy.wrap(response).as('skillsXML'));
        cy.get('@skillsXML').should('be.an', 'boolean').and('be.false');
        //csv
        cy.checkIfCSV(',,,,').then((response) => cy.wrap(response).as('skillsCSV'));
        cy.get('@skillsCSV').should('be.an', 'boolean').and('be.false');
    });
});