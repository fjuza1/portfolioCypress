import {randomArrFakeEntry} from './helpers.js';
import {BASEFAKERURL, FAKEPERSONURL} from '../cypress/support/config.js'
const data = {
	texts: {},
	persons: {},
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
export const texts = function() {
	fetchData(`${BASEFAKERURL}${FAKETEXTURL}`).then(text => {
		data.texts = text.body.data.map(res => res.content)
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
export const init = () => {
	try {
		fakePerson();
		texts();
		companies();
		cy.wrap(data).as('data')
	} catch (err) {
		throw err;
	}
}