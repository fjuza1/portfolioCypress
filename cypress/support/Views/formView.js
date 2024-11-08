import View from './View.js';
class FormView extends View {
    _extractFormFields(form) {
        if (!form || form.tagName.toLowerCase() !== 'form') throw new Error('Invalid. Element must be a form element.');
        return Object.values(form);
    }
    _aliasFormFieldNames(form){
        let name;
        return this._extractFormFields(form).reverse().forEach(field => {
            const nameAttribute = field.getAttribute('name');
            const typeAttribute = field.getAttribute('type');
            const valAttribute = field.getAttribute('value');
            const isRadio = typeAttribute === 'radio';
            if(isRadio) name = valAttribute
            else if (nameAttribute && !isRadio) name = nameAttribute
            else if(nameAttribute === 'name') name = nameAttribute
            else if (typeAttribute && !isRadio) name = typeAttribute
            cy.get(field).as(this._normaliseName(name))
        });
    }
    _extractFormData(form) {
        Object.fromEntries([... new FormData(form)])
    }
}
export default new FormView();