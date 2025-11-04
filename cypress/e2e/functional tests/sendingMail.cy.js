describe('Form validation', () => {
    before(() => {
        cy.getFakeData({text:true,person:true})
        cy.getAll()
        cy.visit('');
    });
    it('We can send mails', () => {
        cy.goContact();
        cy.get('input[name="email"]').type(Cypress.env('mail'));
        cy.get('@data').then((data) => {
            cy.log(data);
            //cy.get('input[name="name"]').type(`${data.persons.firstName} ${data.persons.lastname}`);
            cy.get('input[name="subject"]').invoke('val',data.persons.gender);
            cy.get('textarea[name="message"]').type(data.texts[0]);
            //cy.get('button[type="submit"]').click();
        });
    });
});