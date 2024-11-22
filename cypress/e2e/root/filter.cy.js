describe('Filtering data', () => {
    beforeEach(() => {
        cy.getAll()
        cy.visit('');
    });
    it('Filtering skills - input field', () => {
        cy.randomFixData('skills.json');
        cy.get('@randomData').should('not.be.empty').then(function (skill){
            cy.wrap(skill).as('skill')
            cy.get('@skill').then((skill)=>{
                cy.get('@formActivities').find('#searchName').then(data => {
                    cy.wrap(data).type(skill?.name ?? cy.error('Error has occured.Please fix!'),{force:true})
                    cy.get('@skillsContainer').wait(2000).children().should('have.length.greaterThan', 0)
                })
            })
        })
    });
    it('Filtering Skills Dropdown',()=>{
        cy.randomFixData('skills.json');
        cy.get('@randomData').should('not.be.empty').then(function (skill){
            cy.get('@formActivities').find('select').select(skill?.level ?? cy.error('Error has occured. Please fix!'), {force:true})
            cy.get('@skillsContainer').wait(2000).children().should('have.length.greaterThan', 0)
            cy.get('div[role="progressbar"]').each((skillLevel)=>{
                const text = skillLevel.text();
                cy.wrap(skillLevel).should('contain', skill.level)
            })
        })
    })
});