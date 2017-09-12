// Translate JS

// Con esto requerimos intl en los navegadores safari ya que algunos no
// estan con intl predeterminado, entonces hay que instalarlo y requerimos
// los intl locale que nos hacen falta para safari
if(!window.Intl){
  window.Intl = require('intl');
  require = ('intl/locale-data/jsonp/en-US.js');
  require = ('intl/locale-data/jsonp/es.js');
}

// Aca vamos a requerir para el formtaJS y dar las fechar relativas
var IntlRelativeFormat = window.IntlRelativeFormat = require('intl-relativeformat');
var IntlMessageFormat = require('intl-messageformat');
require('intl-relativeformat/dist/locale-data/en.js');
require('intl-relativeformat/dist/locale-data/es.js');

// Este es el objeto que nos convierte la fecha y le indicamos en que idioma
// lo queremos
// var rf = new IntlRelativeFormat('es');

var es = require('./es');
var en = require('./en-US');

var MESSAGES = {};

// De esta forma le agregamos propiedades a un objeto y le asignamos lo que trae es
MESSAGES.es = es;
// Y si la propiedad tiene espacios o guiones en el nombre lo declaramos asi
MESSAGES['en-US'] = en;

// Vamos a usar el localStorage del navegador para almacenar la eleccion de idioma del
// usuario, este en principio si el usuario no ha definido ninguno idioma tomara por
// defecto el idioma sera Español

var locale = localStorage.locale || 'es';


module.exports = {
  message: function (text, opts) {
    // De esta manera tambien podemos setear un objeto vacio
    opts = opts || {};
    // Le pasammos el lenguaje, luego el mensaje que queremos que traduzca pero se lo pasamos
    // [] y luego el idioma al que queremos convertir
    var msg = new IntlMessageFormat(MESSAGES[locale][text], locale, null);
    return msg.format(opts);
  },
  date: new IntlRelativeFormat(locale)
}
