// Signup

var page = require('page');
var empty = require('empty-element');
// Requerimos lo que nos devuelve el yo-yo, no es necesario poner la extension
// .js
var template = require ('./template');
var title = require('title');

page('/signup',function (ctx,next) {
  // Agregamos la libreria del cambio de title al cambiar de modulo y lo que podemos
  // pasarle es el titulo en un string cada vez que entre en la ruta
  title('Platzigram - Signup');
  var main = document.getElementById('main-container');
  empty(main).appendChild(template);
})
