export const skillsCheck = ()=>{
    cy.containsElementFromFile({filePath:'skills.json', type:'name'})
}
export const navAssesment = ()=>{
    cy.get('@navbarLinks').should((lis) => {
        expect(lis).to.exist;
        expect(lis).to.be.visible;
        expect(lis).to.have.length(5);
    })
}
export const navClicking = () =>{
    cy.get('@navbarLinks').each((lis) => {
        cy.wrap(lis).invoke('text').then((txt) => {
            const text = `#${txt.trim()}`
            // should nbot be visible
            let expectedHash
            // cy.get(text).should('exist').and('not.be.visible').and('have.class', 'section--hidden');
            expectedHash = `#${txt.trim().toLowerCase().replace(/ /g, '-')}`;
            expect(txt).to.not.be.empty;
            expect(txt).to.not.be.null;
            expect(txt).to.not.be.undefined;
            cy.wrap(lis).click({force:true});
            // // shouldf be vsible
            // cy.get(text).should('exist').and('be.visible').and('not.have.class', 'section--hidden');
            //clicking mobile.
            cy.viewport('iphone-6');
            cy.clickMobileNav()
            // expected hash
            cy.getHash(expectedHash)
            expectedHash = `${txt.toLowerCase().replace(/ /g, '-')}`
            cy.getHash(`#${txt.toLowerCase().replace(/ /g, '')}`)
        });
    });
}
export const filterActivitiesCheck = () =>{
            // filterActivitiesCheck
            cy.get('@formActivities').then((body) => {
                const bodyText = body.text();
                cy.wrap(bodyText, {
                    log: false
                }).should('include', 'Sort Skills');
                cy.wrap(bodyText, {
                    log: false
                }).should('include', 'Filter Skills');
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
export const isFound = () => {
    cy.get('@formActivities').getFormFields()
    cy.get('.bi.bi-filter').click();
    cy.get('@skillsContainer').first()
    cy.dataFound('@skillsContainer')
    cy.get('@NAME').type('t')
    cy.wait(1000)
    cy.dataFound('@skillsContainer')
}
export const hoveringState = () => {
    cy.get('@aLinksNav').each(skill => {
        cy.wrap(skill).invoke('css', 'opacity').then((initOpacity) => {
            cy.wrap(skill).trigger('mouseover');
            cy.wrap(skill).should('have.css', 'opacity', initOpacity);
        });
    });
};
