// Landing

var yo = require('yo-yo');

// Vamos a definir la estructura del celular a la izq y una caja a la derecha
// que esta caja va a ser remplazada por el formulario de signin o el formulario
// de signup

// yo-yo nos permite usar variables con los template strings asi como la usamos
// mas abajo, vamos a crear una function  que nos retorne ese landing con la
// caja en la que vamos a pegar la caja de formulario segun la ruta

// Vamos a crear una funcion que nos reciba el template de la caja del signin
// o signup y que nos retorne ya todo el template que nos devuelva yo-yo

module.exports = function landing(box) {
  return yo`<div class="container landing">
        <div class="row">
          <div class="col s10 push-s1">
            <div class="row">
              <div class="col m5 hide-on-small-only ">
                <img src="iphone.png" alt="phone" class="iphone">
              </div>
              ${box}
            </div>
          </div>
        </div>
      </div>`
}
