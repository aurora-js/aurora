var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var path    = require('path');
var bodyParser = require('body-parser');
var sysaura  = require('../controllers/controllersmain');

app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    sysaura.index(req,res);
});

app.post('/simpan', function(req, res) {
   res.send(sysaura.create(req,res ));
});

app.listen(port);
console.log('Magic happens on port ' + port);