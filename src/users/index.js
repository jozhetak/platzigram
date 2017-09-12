// INDEXJS USERS

var page = require('page');
var empty = require('empty-element');
var title = require('title');
var template = require('./template');
var header = require('../header');

page('/:user', header, loadUser, function (ctx,next) {
  // Vamos a usar los template strings y el atributo
  // params de ctx que es el que tiene todos los parametros
  // que le pasamos a la ruta /:user
  title(`Platzigram - ${ctx.params.user}`);
  var main = document.getElementById('main-container');
  empty(main).appendChild(template(ctx.users));
})


page('/:user/:id', header, loadUser, function (ctx,next) {
  // Vamos a usar los template strings y el atributo
  // params de ctx que es el que tiene todos los parametros
  // que le pasamos a la ruta /:user
  title(`Platzigram - ${ctx.params.user}`);
  var main = document.getElementById('main-container');
  empty(main).appendChild(template(ctx.users));
  $(`#modal${ctx.params.id}`).openModal({
    dismissible: true,
    opacity: .5,
    complete: function () {
      page(`/${ctx.params.user}`)
    }
  });
})





async function loadUser(ctx, next) {
  try {
    ctx.users = await fetch(`/api/user/${ctx.params.user}`).then(res => res.json())
    next();
  } catch (e) {
    return console.log(e);
  }
}
