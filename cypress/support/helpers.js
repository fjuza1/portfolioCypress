import {FAKEDATANAME} from './config.js';
import {xml2js, Papa} from './libs.js';
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
    cy.get('[accesskey]').as('navbarLinks');
    cy.get('#export').as('exportActivities');
    cy.get('.mb-2.mb-sm-0.ms-auto.navbar-nav').find('a').as('aLinksNav')
	cy.get("[name='levelNumber']").as('filterLevelEl')
    cy.get('[name="fileType"]').as('exportInps');
    //buttons
    cy.get('[data-btn="export"]').as('exportButton');
    cy.get('@exportActivities').get('button[type="submit"]').as('sortButton');
    cy.get('@exportActivities').get('button[type="reset"]').as('resetButton');
    cy.get('.bi.bi-filter').closest('button').as('filterCollapseBTN')
    cy.get('#Descending').as('descBTN');
    cy.get('#Ascending').as('ascBTN');
    cy.get('#Level').as('levelBTN');
};
/**
 * Checks if a given string is a valid XML.
 *
 * @param {string} xml - The XML string to be validated.
 * @returns {Promise<boolean>} A promise that resolves to true if the XML is valid, otherwise false.
 */
export const isXML = async (xml) => {
    return new Promise((resolve) => {
        xml2js.parseString(xml, (err, result) => {
            if (err || !result) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}
/**
 * Checks if the provided string is a valid CSV format.
 *
 * @param {string} csv - The CSV string to be validated.
 * @returns {Promise<boolean>} A promise that resolves to true if the CSV is valid, otherwise false.
 */
export const isCSV = (csv) => {
    return new Promise((resolve) => {
        Papa.parse(csv, {
            complete: () => resolve(true),
            error: () => resolve(false)
        })
    });
};
/**
 * Checks if the provided string is a valid JSON format.
 *
 * @param {string} json - The JSON string to be validated.
 * @returns {Promise<boolean>} A promise that resolves to true if the JSON is valid, otherwise false.
 *
 * @example
 * isJSON('{"name": "John", "age": 30}').then(result => {
 *     console.log(result); // Output: true
 * });
 *
 * isJSON('{"name": "John", "age": "thirty"}').then(result => {
 *     console.log(result); // Output: false
 * });
 */
export const isJSON = (json) => {
    return new Promise((resolve) => {
        try {
            JSON.parse(json);
            resolve(true);
        } catch (err) {
            resolve(false);
        }
    });
};
