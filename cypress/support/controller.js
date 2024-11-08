export const skillsCheck = ()=>{
    cy.containsElementFromFile({filePath:'skills.json', type:'name'})
}
export const navAssesment = ()=>{
    cy.get('@navbarLinks').should((lis) => {
        expect(lis).to.exist;
        expect(lis).to.be.visible;
        expect(lis).to.have.length(4);
    })
}
export const navClicking = () =>{
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
        });
    });
}
export const filterActivitiesCheck = () =>{
            // filterActivitiesCheck
            cy.get('@filterActivities').then((body) => {
                const bodyText = body.text();
                cy.wrap(bodyText, {
                    log: false
                }).should('include', 'Sort Data');
                cy.wrap(bodyText, {
                    log: false
                }).should('include', 'Filter Data');
            });
}
export const exportActivitesCheck = () =>{
    cy.get('@exportActivities').then((body) => {
        const bodyText = body.text();
        cy.wrap(bodyText, {
            log: false
        }).should('include', 'Export Options')
        .and('include','Export as:')
        .and('include','JSON')
        .and('include','XML')
        .and('include','CSV')
        .and('include','File name')
        .and('include','Export');
    });
}