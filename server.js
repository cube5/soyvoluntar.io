var express = require('express');
// var faker = require('faker');
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var secret = 'qwertyuiopasdfghjklzxcvbnm';

var app = express();
var router = express.Router();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function(req, res) {
  res.json({ message: 'fuck me in the ass' });
});

app.use('/api', router);

app.listen(app.get('port'), function() {
  console.log('App listening on port', app.get('port'));;
});
