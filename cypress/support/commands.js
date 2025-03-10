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
import {getNeededElements} from './helpers.js';
import formView from './Views/formView.js';
Cypress.Commands.add('getFormFields',{prevSubject:true}, subject=> formView._aliasFormFieldNames(subject[0]));
Cypress.Commands.add('containsElementFromFile', options => cy.fixture(options.filePath).each(polozka => cy.contains(polozka[options.type])).log('contains all elements from json file'))
Cypress.Commands.add('goSkills',()=>cy.get('body').trigger('keydown', { altKey:true,keyCode: 83, force:true}));
Cypress.Commands.add('goJourney',()=>cy.get('body').trigger('keydown', { altKey:true,keyCode: 74, force:true}));
Cypress.Commands.add('goProjects',()=>cy.get('body').trigger('keydown', { altKey:true,keyCode: 80, force:true}));
Cypress.Commands.add('goContact',()=>cy.get('body').trigger('keydown', { altKey:true,keyCode: 67, force:true}));
Cypress.Commands.add('goHome',()=>cy.get('body').trigger('keydown', { altKey:true,keyCode: 72, force:true}));
Cypress.Commands.add('getAll', getNeededElements)
Cypress.Commands.add('randomFixData',(url)=>{
  cy.fixture(url).then(function (data){
    const dataI = Math.floor(Math.random() * data.length);
    const randomEntry = data[dataI];
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
Cypress.Commands.add('getInitSkills', () => cy.get('@skillsContainer').getSkillsTextArray().then((skills)=>cy.wrap(skills).as('skillsInit')))
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