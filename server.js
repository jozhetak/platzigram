var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})

var upload = multer({ storage: storage }).single('picture');

var app = express();

// para decirle a express atraves de node que vamos a utilizar un motor de
// vistas lo hacemos asi

app.set('view engine', 'pug');

// Aca lo que hacemos es decirle a nuestro servidor web que puede servirse de
// los archivos estaticos en la carpeta public y este public queda de una manera
// virtual, de esta menera en nuestro archivo pug no le indicamos a la ruta que
// ingrese a public si no dejamos solo el nombre del archivo y el lo va a buscar
// directamente
// pero entonces lo que hace app.use es empezar buscando por la ruta que le indicamos
// abajo y si no la encuentra buscara en las rutas que este mas abajo
app.use(express.static('public'));

// El '/' indica la ruta, en este caso esta solo '/' ya que esta en localhost
// Luego el segundo parametro es una funcion con dos parametros el request y
// el response
app.get('/', function (req, res) {
  //res.render si va a llamar al motor de vistas que hayamos seteado arriba
  // Primero acepta como parametro el nombre del archivo y como segundo parametro
  // le podemos pasar un objeto con valor de todas las variables que queramos
  res.render('index', { title: 'Platzigram'});
})

// Vamos a indicar las demas rutas para que nuestro index.JS pueda trabajar
// sobre ellas

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Platzigram - Signup'});
})


app.get('/signin', function (req, res) {
  res.render('index' , { title: 'Platzigram - Signin'});
})


// Vamos a definir una ruta para nuestra API y  luego la vamos a consumir
// para traer nuestro datos
app.get('/api/pictures', function (req, res) {
  // Vamos a hacer de cuenta que vamos a traer nuestros datos de una BD
  var pictures = [
    {
      user: {
        username: 'Stvanaya',
        avatar: 'http://materializecss.com/images/office.jpg'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createDat: new Date().getTime()
    },
    {
      user: {
        username: 'Stvanaya',
        avatar: 'http://materializecss.com/images/office.jpg'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createDat: new Date().setDate(new Date().getDate()-10)
    }
  ];

  // Express se da cuenta que pictures es un objeto de tipo Array y nos
  // envia un objeto de tipo JSON y tenemos que volver a recuperar
  // las pictures

    setTimeout(() => res.send(pictures), 2000)


})

app.post('/api/pictures', function (req, res) {
  upload(req, res, function (err) {
    if (err){
      return res.send(500, "Error uploading file");
    }else {
      res.send('File uploaded');
    }
  })
})

app.get('/api/user/:username', function (req, res) {
  const users = {
    username: 'Stvanaya',
    avatar: 'https://scontent.fbog3-1.fna.fbcdn.net/v/t1.0-9/14590513_1598847257084641_8219447913012273099_n.jpg?oh=7986303946fd0b3853607414f2c53935&oe=5A17A47A',
    pictures: [
      {
        id: 1,
        src: 'https://scontent.fbog3-1.fna.fbcdn.net/v/t1.0-9/20841883_823398641168196_843660931168529084_n.png?oh=c827e844fa2db9450065b6900afd32e0&oe=5A143D0D',
        likes: 2
      },
      {
        id: 2,
        src: 'https://scontent.fbog3-1.fna.fbcdn.net/v/t1.0-0/p480x480/21271306_1836011359773120_234918716919178235_n.jpg?oh=17fef7186a9c98df9f73aa7bd3634b4c&oe=5A236A4D',
        likes: 6
      },
      {
        id: 3,
        src: 'https://scontent.fbog3-1.fna.fbcdn.net/v/t1.0-0/s480x480/21317784_1528323547233114_4598461848149150658_n.jpg?oh=71daaedf0a7a599e4e739de2812abfc4&oe=5A1FC8CE',
        likes: 8
      },
      {
        id: 4,
        src: 'https://scontent.fbog3-1.fna.fbcdn.net/v/t1.0-0/p480x480/21271004_1503862902983539_7448062612958351048_n.jpg?oh=f0c8b46cdb635ed16e3b0f0e4dc4b635&oe=5A509F7B',
        likes: 3
      },
      {
        id: 5,
        src: 'https://scontent.fbog3-1.fna.fbcdn.net/v/t1.0-9/21314801_1528313927234076_2037749351453563847_n.jpg?oh=8624865d583a4c8df2fa0e35502f1641&oe=5A5D3AED',
        likes: 0
      },
      {
        id: 6,
        src: 'https://scontent.fbog3-1.fna.fbcdn.net/v/t1.0-0/s480x480/21317400_1792725484136084_1033777757420245342_n.png?oh=f4788976b0343e82cb131ace42092d3c&oe=5A236C1E',
        likes: 99
      }
    ]
  }
  res.send(users);
})

app.get('/:user', function (req, res) {
  res.render('index' , { title: `Platzigram - ${req.params.user}`});
  // console.log(req);
})

app.get('/:user/:id', function (req, res) {
  res.render('index' , { title: `Platzigram - ${req.params.user}`});
  // console.log(req);
})

// Le indicamos que inicie nuestro servidor, le pasamos por parametro el puerto
// que tendra que escuchar y una funcion que capture un error si ocurre
// A esa funcion la acompañamos con un finalizador de proceso por si ocurre el error
// que tiene como valor de defecto un 0, entonces le pasamos 1 por parametro
app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);

  console.log('Platzigram escuchando en el puerto 3000');
})
