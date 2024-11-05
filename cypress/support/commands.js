// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
const { TIMEOUT, WAIT_TIME, BASEFAKERURL} = require('./config.js');
const { init, fakePerson} = require('../../src/model.js');
const _ = Cypress._;
Cypress.Commands.add('fake', (url) => {
  cy.request(BASEFAKERURL + url).then(response => {
      if (response.status === 200) return response
  })
  Cypress.log({
      displayName: 'fakeData',
      message: url,
      consoleProps() {
          return url
      }
  })
});
Cypress.Commands.add('getHash',(assertionVal)=>{
  cy.hash().as('hash');
  cy.get('@hash').should('eq', assertionVal);
});
const randI = Math.floor(Math.random() * 10 + 1)
Cypress.Commands.add('rareNum', function() {
  const rareNum = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  cy.wrap(rareNum).as('num');
});
Cypress.Commands.add('getOsoba',()=>{
  fakePerson();
})
Cypress.Commands.add('randOption', () => {
  const randI = Math.floor(Math.random() * 10 + 1);
  const down = '{downarrow}'.repeat(randI);
  cy.wrap(down).as('option');
});
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })