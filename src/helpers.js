import {FAKEDATANAME} from '../cypress/support/config.js';
export const randomArrFakeEntry = (arr) =>{
	const rand = Math.floor(Math.random() * arr.body.data.length)
	return arr.body.data[rand]
}
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