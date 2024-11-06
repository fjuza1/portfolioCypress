describe('Design', () => {
    before(() => {
        cy.getAll()
    });
    it('Clicks on nav', () => {
        cy.visit('');
        cy.get('#navbarsExample03').as('navbar')
        cy.get('@navbar').find('li').as('navbarLinks')
        cy.get('@navbarLinks').should((lis) => {
            expect(lis).to.exist;
            expect(lis).to.be.visible;
            expect(lis).to.have.length(4);
        })
        cy.get('@navbarLinks').each((lis) => {
            cy.wrap(lis).invoke('text').then((txt) => {
                const text = `#${txt.trim()}`
                // should nbot be visible
                cy.get(text).should('exist').and('not.be.visible').and('have.class', 'section--hidden');
                const expectedHash = `#${txt.trim().toLowerCase().replace(/ /g, '-')}`;
                expect(txt).to.not.be.empty;
                expect(txt).to.not.be.null;
                expect(txt).to.not.be.undefined;
                cy.wrap(lis).click();
                // shouldf be vsible
                cy.get(text).should('exist').and('be.visible').and('not.have.class', 'section--hidden');
                // expected hash
                cy.getHash(expectedHash)

                // check styles
            });
        });
        cy.get('body', {
            log: false
        }).then((body) => {
            const bodyText = body.text();

            // Wrap each assertion in `cy.wrap` to suppress logging individually
            cy.wrap(bodyText, {
                log: false
            }).should('include', 'Sort data');
            cy.wrap(bodyText, {
                log: false
            }).should('include', 'Filter data');
            cy.wrap(bodyText, {
                log: false
            }).should('include', 'Export as:');
        });
    });
    it('Skills are correct',()=>{
        cy.visit('');
        cy.containsElementFromFile({filePath:'skills.json', type:'name'})
    })
    it('Toggling menus', () => {
        cy.visit('');
    });
});