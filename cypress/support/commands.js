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
const { TIMEOUT, WAIT_TIME, BASEFAKERURL}  = ('./config.js')
import { init, fakePerson, fakeUser}  from './model.js';
import formView from './Views/formView.js';
Cypress.Commands.add('getFormFields',{prevSubject:true}, subject=> formView._aliasFormFieldNames(subject[0]));
Cypress.Commands.add('containsElementFromFile', options => cy.fixture(options.filePath).each(polozka => cy.contains(polozka[options.type])).log('contains all elements from json file'))
Cypress.Commands.add('getAll',()=>{
    cy.visit('');
    cy.getHash('');
    cy.get('#skillsContainer').as('skillsContainer')
    cy.get('#About').as('about');
    cy.get('a[data-navlink="About"]').as('about_li')
    cy.get('#Skills').as('skills');
    cy.get('a[data-navlink="Skills"]').as('skills_li');
    cy.get('.filterActivities').as('formActivities');
    cy.get('.exportActivities').as('exportActivities');
    cy.get('@exportActivities').get('button[type="submit"]').as('sortButton');
    cy.get('.bi.bi-filter').closest('button').as('filterCollapseBTN')
    cy.get('#Projects').as('projects');
    cy.get('a[data-navlink="Projects"]').as('projects');
    cy.get('#Contact').as('contact');
    cy.get('a[data-navlink="Contact"]').as('contact')
    cy.get('#navbarsExample03').as('navbar');
    cy.get('@navbar').find('li').as('navbarLinks');
    cy.get('#export').as('exportActivities');
    cy.get('.mb-2.mb-sm-0.ms-auto.navbar-nav').find('a').as('aLinksNav')
})
Cypress.Commands.add('randomFixData',(url)=>{
  cy.fixture(url).then(function (data){
    const dataI = Math.floor(Math.random() * data.length);
    const randomEntry = data[dataI];
    console.log("🚀 ~ randomEntry:", randomEntry)
    cy.wrap(randomEntry).as('randomData')
  })
})
Cypress.Commands.add('getSkillsTextArray',{prevSubject:'element'},(skills)=>{
  cy.wrap(skills).first().find('.justify-content-between')
  .then((names)=>{
      const textArray = names.toArray()
      .map(text => text.innerText.trim());
      return textArray
  })
})
Cypress.Commands.add('dataFound', part=> cy.get(part).children().should('not.have.class', 'alert alert-danger').log('Skills have been found'))
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
Cypress.Commands.add('clickPCNav', (nav) => cy.get(`a[data-navlink="${nav}"]:not(.dropdown-item)`).click());
Cypress.Commands.add('clickMobileNav', {prevSubject: 'element'}, nav => cy.get(`a[data-navlink="${nav}"].dropdown-item`).click({force:true}))
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