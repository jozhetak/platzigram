//Homepage

var page = require('page');
var empty = require('empty-element');
// Requerimos lo que nos devuelve el yo-yo, no es necesario poner la extension
// .js
var template = require ('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');
var translate = require('../translate');

page('/', header, loading, loadPicturesAxios, function (ctx,next) {
  // Agregamos la libreria del cambio de title al cambiar de modulo y lo que podemos
  // pasarle es el titulo en un string cada vez que entre en la ruta
  title('Platzigram');
  var main = document.getElementById('main-container');



  empty(main).appendChild(template(ctx.pictures));
})

function loading(ctx, next) {
  var el = document.createElement('div');
  el.classList.add('loader');
  document.getElementById('main-container').appendChild(el);
  next();
}

// page nos permite crear middlewares con cadena de funciones que se llama
// una tras otra, por medio del parametro next indicamos cual es la siguiente
// funcion que tiene que llamar

// Page tiene que cargar las pictures desde el servidor y vamos a hacer una funcion
// que nos cargue esas pictures

// El ultimo middlewares si lo podemos dejar como una funcion anonima pero los demas
// por buena practica las dejamos nombradas y las creamos en otro lado

function loadPictures (ctx, next) {
  request
    .get('/api/pictures')
    .end(function (err, res) {
      if(err) return console.log(err);

      // ctx nos permite compartir datos atraves de las middlewares entonces
      // le vamos a asigarnar las pictures a ctx
      ctx.pictures = res.body;
      // Luego llamamos a next() para que nos ejecute la funcion siguiente que
      // seria la que nos renderiza las pictures en los templates
      next();
    })
}


function loadPictures (ctx, next) {
  request
    .get('/api/pictures')
    .end(function (err, res) {
      if(err) return console.log(err);

      // ctx nos permite compartir datos atraves de las middlewares entonces
      // le vamos a asigarnar las pictures a ctx
      ctx.pictures = res.body;
      // Luego llamamos a next() para que nos ejecute la funcion siguiente que
      // seria la que nos renderiza las pictures en los templates
      next();
    })
}

// Aca cargamos las pictures con axios

function loadPicturesAxios(ctx, next) {
  axios
    .get('/api/pictures')
    .then(function (res) {
      ctx.pictures = res.data;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

function loadPicturesFetch(ctx, next) {
  fetch('/api/pictures')
    // Esta primera promesa nos obtiene la respuesta del
    // servidor y la tenemos que retornar para encadenar
    // con la otra promesa y poder manipular ahi si los
    // datos
    .then(function (res) {
      // aca el resultado que nos entrega el navegador lo
      // convertimos en JSON
      return res.json();
    })
    // Aca si ya manipulamos las pictures que nos devuelven
    // la promesa anterior
    .then(function (pictures) {
      ctx.pictures = pictures.data;
      next();
    })
    .catch(function (err) {
      console.log(err);
    })
}

async function asyncLoad(ctx, next) {
  try {
    // Este esperra por el await hasta que se solucionen todas las promesas
    // del fetch y ahi si pone el valor de las pictures en el contexto
    ctx.pictures = await fetch('/api/pictures').then(res => res.json())
    next();
  } catch (err) {
    return console.log(err);
  }
}
