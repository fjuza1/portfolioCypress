export default class View {
    _normaliseName (htmlEl){
        return htmlEl.split('').map(name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()).join('');
    }
};
