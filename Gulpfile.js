
// En este archivo es donde vamos a requerir a gulp y a sass
// Despues el de gulp-rename para poder renombrar el archivo final con un
// pipe

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// Para indicar las tareas de gulp le pasamos por parametro el nombre de la tarea
// y una function donde le indicamos lo que queremos que haga
// En este caso le vamos a decir a gulp que escoga nuestros estilos en nuestro
// archivo scss y cargarlos a nuestro preprocesador sass

// gulp  es una sucesion de pipes, primero pasa un pipe luego pasa otro pise y
// asi sucesivamente, luego le decimos en que src debe arrancar

// No ponemos , despues de cada pipe ya que vamos a trabajar sobre el resultado
// de el pipe anterior, entonces es como si fuese una tuberia

// luego de poner donde debe empezar le indicamos por donde pasarlo, que es sass
// que es una funcion y la escribimos como tal

// luego le indicamos en que parte queremos que pegue ese resultado de esos pipes,
// lo hacemos con el gulp.dest('destino')
gulp.task('styles', function () {
  gulp
    .src('index.scss')
    .pipe(sass())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('public'));
})

gulp.task('assets', function () {
  gulp
    .src('assets/*')
    .pipe(gulp.dest('public'));
})

// Ahora vamos a hacer una funcion que nos permita hacer el watch a los bundle

function compile(watch){
  // Vamos a crear una variable que nos guarde todo lo que nos de watchify y le
  // decimos que reciba para hacer watch lo que nos entrega browserify
  var bundle = browserify('./src/index.js', {debug: true});

  // Ahora vamos a evaluar si lo que recibimos como parametro es false para poder
  // agregar el escuchador a los archivos que nos devuelve el bundle
  if (watch) {
    bundle = watchify(bundle);
    // bundle tiene una funcoin llamada on() que nos permite agregar un evento
    // update que va a escuchar si ocurre una actualizacoin de ciertos archivos
    bundle.on('update', function () {
      console.log('--> Bundling...');
      // Luego lanzamos la funcion rebundle() que vamos a crear nosotros y en donde
      // vamos a colocar toda la secuencia de tareas que teniamos en la tarea de
      // 'scripts' mas abajo
      rebundle();
    })
}
  // Aca agregmos nuestra funcion rebundle
  function rebundle() {
    bundle
      .transform(babel, {presets: ["es2015"], plugins: ['syntax-async-functions', 'transform-regenerator']})
      .bundle()
      .on('error', function (err) { console.log(err); this.emit('end')})
      .pipe(source('index.js'))
      .pipe(rename('app.js'))
      .pipe(gulp.dest('public'));
  }

  rebundle();
}


// Ahora vamos a agregar una nueva tarea para que gulp procese nustro archivo
// index.js, pero antes tenemos que requerir babel y browserify
// Llamamos a browserify y le decimos la ruta donde tiene que ir a buscar el
// archivo js que queremos que convierta
// Luego le decimos que use babel para que lo transpile a es2015 y luego le ponemos
// bundle para que este lo procese y que nos genere ese archivo
// Luego vamos a poner una serie de pipes que procesen ese bundle que nos entrega
// browserify, primero le vamos a dar un source que tenemos que instalar en npm, ese
// source lo que hace es que entrega algo que pueda entender gulp ya que lo que nos
// trae browserify no lo entiende gulp y por eso lo tenemos que procesar para que
// podamos seguir trabajando con gulp
// npm comando: npm i vinyl-source-stream

// gulp.task('scripts', function () {
//   browserify('./src/index.js')
//     .transform(babel, {presets: ["es2015"]})
//     .bundle()
//     .pipe(source('index.js'))
//     .pipe(rename('app.js'))
//     .pipe(gulp.dest('public'));
// })

// Ahora vamos a agregar las tareas para los scripts de npm
gulp.task('build', function () {
  return compile();
});

gulp.task('watch', function () {
  return compile(true);
});


// luego vamos a realizar la tarea por default
// Este recibe por segundo parametro un array, que puede realizar varias tareas
// en paralelo, en este caso solo vamos a poner una sola
gulp.task('default', ['styles','assets','build'])
