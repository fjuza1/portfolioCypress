import {FAKEDATANAME} from './config.js'
export const fetchData = (url, body = undefined, method, header = undefined) => {
	let end;
	let resTime
	const start = performance.now();
	const fetchPro = body ? cy.request({
			method: method,
			url: url,
			form: false,
			headers: header,
			body: body
		})
		.then(response => {
			end = performance.now()
			resTime = (end - start) / 1000
			Cypress.log({
				displayName: FAKEDATANAME,
				message: `Response for ${url} was ${resTime.toFixed(2)}s`,
				consoleProps() {
					return url
				}
			});
			if (response.status === 200) return response;
		}) :
		cy.request({
			method: 'GET',
			url: url,
			headers: header
		})
		.then(response => {
			end = performance.now()
			resTime = (end - start) / 1000
			Cypress.log({
				displayName: FAKEDATANAME,
				message: `Response for ${url} was ${resTime.toFixed(2)}s`,
				consoleProps() {
					return url
				}
			});
			if (response.status === 200) return response;
		});
	return fetchPro
};
export const getNeededElements = () =>{
	cy.visit('');
    cy.getHash('');
    cy.get('#skillsContainer').as('skillsContainer')
    cy.get('#About').as('about');
    cy.get('a[data-navlink="About"]').as('about_li')
    cy.get('#Skills').as('skills');
    cy.get('a[data-navlink="Skills"]').as('skills_li');
    cy.get('.filterActivities').as('formActivities');
    cy.get('.exportActivities').as('exportActivities');
    cy.get('#Projects').as('projects');
    cy.get('a[data-navlink="Projects"]').as('projects');
    cy.get('#Contact').as('contact');
    cy.get('a[data-navlink="Contact"]').as('contact')
    cy.get('#navbarsExample03').as('navbar');
    cy.get('@navbar').find('li').as('navbarLinks');
    cy.get('#export').as('exportActivities');
    cy.get('.mb-2.mb-sm-0.ms-auto.navbar-nav').find('a').as('aLinksNav')

    //buttons
    cy.get('@exportActivities').get('button[type="submit"]').as('sortButton');
    cy.get('@exportActivities').get('button[type="reset"]').as('resetButton');
    cy.get('.bi.bi-filter').closest('button').as('filterCollapseBTN')
    cy.get('#Descending').as('descBTN');
    cy.get('#Ascending').as('ascBTN');
    cy.get('#Level').as('levelBTN');
};