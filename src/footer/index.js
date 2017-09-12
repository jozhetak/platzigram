var yo = require('yo-yo');
var translate = require('../translate');


var el = yo`<footer class="site-footer">
  <div class="container">
    <div class="row">
      <div class="col s12 l3 center-align"><a href="#" data-activates="dropdown1" class="dropdown-button btn btn-flat">${translate.message('language')}</a>
        <ul id="dropdown1" class="dropdown-content">
          <li><a href="#" onclick=${lang.bind(null, 'es')}>${translate.message('spanish')}</a></li>
          <li><a href="#" onclick=${lang.bind(null, 'en-US')}>${translate.message('english')}</a></li>
        </ul>
      </div>
      <div class="col s12 l3 push-l6 center-align">© 2016 Platzigram</div>
    </div>
  </div>
</footer>`;

function lang(locale) {
  // Vamos a guardar en el localStorage lo que pasemos por parametro que sera
  // el idioma seleccionado por el usuario
  localStorage.locale = locale;
  // Esto lo que hace es recargarnos la pagina en la que estemos cuando
  // seleccionemos el idioma que deseemos
  location.reload();
  // Aca quitamos el # que nos agrega la ancla cuando damos click en ella
  return false;
}

document.body.appendChild(el);
