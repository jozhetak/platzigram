// Template Homepage

// Homepage
var yo = require('yo-yo');
var layout = require('../layout');
var picture = require('../picture-card');
// Aca cuando queramos hacer una traduccion siempre llamara al metodo message
// de translate
var translate = require('../translate');
var request = require('superagent');
// En este no vamos a usar el landing, vamos a usar otro archivo

// Le damos module.exports a lo que nos devuelve yo-yo para luego requerirlo
// donde lo vayamos a utilizar, asi mantenemos modular nuestro codigo y
// separamos nuestro codigo por responsabilidades

// Por cada objeto de picture que exista que haga el template de los cards
// y el parametro que recibe esa funcion de interna es el mismo de la funcion
// externa

module.exports = function (pictures) {
  var el =  yo`<div class="container timeline">
  <div class="row">
    <div class=" col s12 m10 offset-m1 l8 offset-l2 center-align">
      <form enctype="multipart/form-data" class="form-upload" id="formUpload" onsubmit=${onsubmit}>
        <div id="fileName" class="fileUpload btn btn-flat cyan">
        <span><i class="fa fa-camera" aria-hidden="true"></i>${translate.message('upload-picture')}</span>
        <input name="picture" id="file" type="file" class="upload" onchange=${onchange}/>
        </div>
        <button id="btnUpload" type="submit" class="btn btn-flat cyan hide">${translate.message('upload')}</button>
        <button id="btnCancel" type="button" class="btn btn-flat red hide" onclick=${cancel}><i class="fa fa-times" aria-hidden="true"></i></button>
      </form>
    </div>
  </div>
    <div class="row">
      <div class="col s12 m10 offset-m1 l6 offset-l3">
        ${pictures.map(function (pic){
          return picture(pic);
        })}
      </div>
    </div>
  </div>`;

  function onchange() {
    toggleButtons();

  }
  function cancel() {
    toggleButtons();
    document.getElementById('formUpload').reset();
  }

  function toggleButtons() {
    document.getElementById('fileName').classList.toggle('hide');
    document.getElementById('btnUpload').classList.toggle('hide');
    document.getElementById('btnCancel').classList.toggle('hide');
  }

  function onsubmit(ev) {
    // Aca le decimos que no nos lance el request que ejecuta por defecto
    // el evento submit de los form
    ev.preventDefault();

    // Aca vamos a usar el FormData que nos brinda el window y vamos a usar
    // el request de esta manera, a este FormData lo que tenemos que pasarle
    // es todo el formulario con todo su contenido es decir con el archivo
    // ya seleccionado, o sea la variable .this va a hacer referencia a el
    // formulario
    var data = new FormData(this);
    request
      .post('/api/pictures')
      .send(data)
      .end(function (err, res) {
        console.log(arguments);
      })

  }
  // Layout es el que nos devuelve la grilla centrada con el header, entonces
  // le pasamos solo el contenido para que nos devuelva todo organizado
  return layout(el);

}

// Ahora vamos a exportar la funcion del landing que es la que vamos a llamar
// y le vamos a pasar el signupForm
