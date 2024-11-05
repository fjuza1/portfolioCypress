const {
	fetchData,
	randomArrFakeEntry
} = require('./helpers.js');
const {BASEFAKERURL, FAKEPERSONURL} = require('../cypress/support/config.js');
const data = {
	texts: {},
	persons: {},
	companies: {}
}
const authSOVAAPI = function() {
	const payload = SOVAAUTHBODY.body
	fetchData('http://dev-promo/svc/iam/Iam.Core3.Svc.Wcf/LogInService.svc', payload, 'POST', {
		"Content-Type": "application/soap+xml;charset=utf-8"
	}).then((token) => {
		const jsParsed = parseString(token.body, {
			explicitArray: false
		}, function(err, result) {
			cy.wrap(result['s:Envelope']['s:Body']['OutputMessageOf_LogInOutput']['Content']['TokenDescriptor']).as('tokenDesc');
		})
	})
}
const fakePerson = () => {
	try {
		fetchData(`${BASEFAKERURL}${FAKEPERSONURL}`).then(function(osoba) {
			data.persons = randomArrFakeEntry(osoba)
			cy.wrap(data.persons).as('osoba')
		})
	} catch (err) {
		throw err;
	}
}
const texts = function() {
	fetchData(`${BASEFAKERURL}${FAKETEXTURL}`).then(text => {
		data.texts = text.body.data.map(res => res.content)
	})
}
const companies = function() {
	try {
		fetchData(`${BASEFAKERURL}${FAKECOMPANIESURL}`).then(function(osoba) {
			data.companies = randomArrFakeEntry(osoba)
		})
	} catch (err) {
		throw err;
	}
}
const typSviatku = (baseAPIUrl, id) => {
	try {
		authSOVAAPI();
		cy.get('@tokenDesc').then((val) => {
			fetchData(`${baseAPIUrl}${TYPSVIATKUURLPLUS}${id}`, undefined, undefined, {
					"X-Token-Descriptor": val
				})
				.then((response) => {
					const typSviatku = response.body.cis_udalost_kalendar_sviatkov[0].e_typ_sviatku_id___nazov;
					cy.wrap(typSviatku).as('typSviatku');
				})
		})
	} catch (err) {
		if (err || typeof id !== 'number') {
			throw err;
		}
	}
};
const projektCislo = (baseAPIUrl) => {
	try {
		authSOVAAPI();
		cy.get('@tokenDesc').then((val) => {
			fetchData(`${baseAPIUrl}${PROJEKTCISLOURLPLUS}`, undefined, undefined, {
					"X-Token-Descriptor": val
				})
				.then((response) => {
					const projektCislo = response.body.projekt_cislo
					cy.wrap(projektCislo).as('projektCislo');
					cy.get('@projektCislo').then((projCislo) => {
						const i = projCislo.length
						const randomEntry = Math.floor(Math.random() * i + 1)
						cy.wrap(projCislo[randomEntry].nazov).as('nazovProjektCislo')
					})
				})
		})
	} catch (err) {
		throw err;
	}
}
const kodSkupiny = (baseAPIUrl) => {
	try {
		authSOVAAPI();
		cy.get('@tokenDesc').then((val) => {
			fetchData(`${baseAPIUrl}${KODSKUPINYURLPLUS}`, undefined, undefined, {
					"X-Token-Descriptor": val
				})
				.then((response) => {
					const KodSkupiny = response.body.kod_skupiny
					cy.wrap(KodSkupiny).as('KodSkupiny');
				})
		})
	} catch (err) {
		throw err;
	}
}
const firma = (baseAPIUrl) => {
	try {
		authSOVAAPI();
		cy.get('@tokenDesc').then((val) => {
			fetchData(`${baseAPIUrl}${FIRMAURLPLUS}`, undefined, undefined, {
					"X-Token-Descriptor": val
				})
				.then((response) => {
					const firma = response.body.firma
					cy.wrap(firma).as('Firma');
				})
		})
	} catch (err) {
		throw err;
	}
}
const getDatumy = () => {
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
const init = () => {
	try {
		fakePerson();
		texts();
		companies();
		cy.wrap(data).as('data')
	} catch (err) {
		throw err;
	}
}
module.exports = {
	init,
	typSviatku,
	projektCislo,
	kodSkupiny,
	getDatumy,
	fakePerson
}