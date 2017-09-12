require('babel-polyfill');
var page = require('page');
// Es importante tener un orden de como requerimos las rutas primero el
// homepage ya que primero se define una ruta para el homepage y luego se define
// otra para el signup en el signup
// var moment = require('moment');

// Vamos a requerir el modulo del momentJS con el lenguaje que queremos
// convertir
// require('moment/locale/es');
// Seteamos el lenguaje en español
// moment.locale('es');


require('./homepage');
require('./signup');
require('./signin');
require('./users');
require('./footer');
// Lo bueno de page es que siempre exporta un objeto para todos entonces no tenemos
// que estar iniciandolo en todas partes
page();
