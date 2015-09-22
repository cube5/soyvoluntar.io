var express = require('express');
// var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var secret = 'bestfuckingsecretintheworld';
var jwtCheck = expressJwt({ secret: secret });
var app = express();
var router = express.Router();

app.set('port', (process.env.PORT || 3000));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var user = {
  username: 'cube5',
  password: 'cube5'
};

router.get('/', function(req, res) {
  res.json({ message: 'fuck me in the ass' });
});

router.post('/login', authenticate, function(req, res) {
  console.log('login');
  var token = jwt.sign({
    username: user.username
  }, secret);
  res.send({
    token: token,
    user: user
  });
});

router.get('/user', jwtCheck, function(req, res) {
  res.json({
    'username': 'cube5',
    'name': 'cube5',
    'scope': ['edit']
  }).status(200);
});

router.get('/events', jwtCheck, function(req, res) {
  res.json([
    {
      'id': 1,
      'name': 'Event 1',
      'description': 'Event 1 description',
      'address': 'Av. Ignacio Zaragoza Colonia Santo Tomas #456',
      'ong': {
        'id': 1,
        'name': 'Ojos que sienten',
        'address': 'Leandro Lizarraga #098  Colonia Buena Vista'
      }
    }
  ]).status(200);
}).get('/events/:id', jwtCheck, function(req, res) {
  res.json({
    'id': 1,
    'name': 'Event 1',
    'description': 'Event 1 description',
    'address': 'Av. Ignacio Zaragoza Colonia Santo Tomas #456',
    'ong': {
      'id': 1,
      'name': 'Ojos que sienten',
      'address': 'Leandro Lizarraga #098  Colonia Buena Vista'
    }
  }).status(200);
});

app.use('/api', router);

app.listen(app.get('port'), function() {
  console.log('App listening on port', app.get('port'));
});

function authenticate(req, res, next) {
  var body = req.body;
  if(!body.username || !body.password) {
    res.status(400).end('Must provide user and password');
  }
  if(body.username !== user.username || body.password !== user.password) {
    res.status(401).end('Username or pass incorrect');
  }
  next();
}
