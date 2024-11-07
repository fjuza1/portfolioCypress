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
import { TIMEOUT, WAIT_TIME, BASEFAKERURL}  from './config.js'
import { init, fakePerson, fakeUser}  from './model.js';
Cypress.Commands.add('containsElementFromFile',(options)=>cy.fixture(options.filePath).each(polozka => cy.contains(polozka[options.type])).log('contains all elements from json file'))
Cypress.Commands.add('getAll',()=>{
    cy.visit('');
    cy.getHash('');
    cy.get('#About').as('about');
    cy.get('a[data-navlink="About"]').as('about_li')
    cy.get('#Skills').as('skills');
    cy.get('a[data-navlink="Skills"]').as('skills_li')
    cy.get('#Projects').as('projects');
    cy.get('a[data-navlink="Projects"]').as('projects')
    cy.get('#Contact').as('contact');
    cy.get('a[data-navlink="Contact"]').as('contact')
})
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
Cypress.Commands.add('getFakeData', (options) => init (options) )
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