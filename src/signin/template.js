// Template Signin

// Signup
var yo = require('yo-yo');

var landing = require('../landing');
var translate = require('../translate');
// Le damos module.exports a lo que nos devuelve yo-yo para luego requerirlo
// donde lo vayamos a utilizar, asi mantenemos modular nuestro codigo y
// separamos nuestro codigo por responsabilidades


var signinForm =  yo`<div class="col s12 m7 center-align">
      <div class="row">
        <div class="signup-box">
          <h1 class="platzigram">Platzigram</h1>
          <form class="signup-form" action="index.html" method="post">
            <div class="section">
              <a href="#" class="btn btn-fb hide-on-small-only">${translate.message('signup.facebook')}</a>
              <a href="#" class="btn btn-fb hide-on-med-and-up"><i class="fa fa-facebook-official"></i>${translate.message('signup.text')}</a>
            </div>
            <div class="divider">

            </div>
            <div class="section">
              <input type="text" name="username" placeholder="${translate.message('username')}" />
              <input type="password" name="password" placeholder="${translate.message('password')}" />
              <button class="btn waves-effect waves-light btn-signup" type="submit">${translate.message('signup.text')}</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="login-box">
          ${translate.message('signin.not-have-account')} <a href="/signup">${translate.message('signup.call-to-action')}</a>
        </div>
      </div>
    </div>`;

// Ahora vamos a exportar la funcion del landing que es la que vamos a llamar
// y le vamos a pasar el signupForm

module.exports = landing(signinForm);
