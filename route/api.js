var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;
var path    = require('path');
var bodyParser = require('body-parser');
var sysaura  = require('../controllers/controllersmain');

app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+ '/../public/myfile.html'));
});

app.post('/simpan', function(req, res) {
    res.send(sysaura.create(req,res));
});

app.listen(port);
console.log('Magic happens on port ' + port);