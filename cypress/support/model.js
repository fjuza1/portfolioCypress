import {fetchData, randomArrFakeEntry} from './helpers.js';
const {BASEFAKERURL, FAKEPERSONURL, FAKETEXTURL, FAKEUSER} =  require('./config.js');
const data = {
	texts: {},
	persons: {},
	user: {},
}
export const fakePerson = () => {
	try {
		fetchData(`${BASEFAKERURL}${FAKEPERSONURL}`).then(function(osoba) {
			data.persons = randomArrFakeEntry(osoba)
			cy.wrap(data.persons).as('osoba')
		})
	} catch (err) {
		throw err;
	}
}
export const generatedTexts = () => {
	fetchData(`${BASEFAKERURL}${FAKETEXTURL}`).then(text => {
		data.texts = text.body.data.map(res => res.content)
	})
}
export const fakeUser = () =>{
	fetchData(`${BASEFAKERURL}${FAKEUSER}`).then(user => {
        data.user = randomArrFakeEntry(user)
    })
}
export const getDatumy = () => {
	const dateStart = new Date();
	dateStart.setDate(dateStart.getDate() + Math.floor(Math.random() * MAX + MIN));
	dateStart.setMonth(dateStart.getMonth() + Math.floor(Math.random() * MAX + MIN));
	dateStart.setFullYear(dateStart.getFullYear() + Math.floor(Math.random() * MAX + MIN));
	const formattedDateStart = dateStart.toLocaleString(DATESTRING, DATEOPTIONS).replaceAll(" ", "");
	const dateEnd = new Date(dateStart);
	dateEnd.setDate(dateEnd.getDate() + Math.floor(Math.random() * MAX + MIN));
	dateEnd.setMonth(dateEnd.getMonth() + Math.floor(Math.random() * MAX + MIN));
	dateEnd.setFullYear(dateEnd.getFullYear() + Math.floor(Math.random() * MAX + MIN));
	const formattedDateEnd = dateEnd.toLocaleString(DATESTRING, DATEOPTIONS).replaceAll(" ", "");
	cy.wrap(formattedDateStart).as('startDate');
	cy.wrap(formattedDateEnd).as('endDate');
}
export const init = (options) => {
	try {
		const {person, text, user} = options;
		// runningg
		if(person && person === true ) fakePerson()
		if(text && text === true) generatedTexts()
		if(user && user === true) fakeUser()
		cy.wrap(data).as('data')
		Cypress.log({
			displayName: 'fakeData',
			message: data,
			consoleProps() {
				return data
			}
		})
	} catch (err) {
		throw err;
	}
}