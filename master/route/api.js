var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var path    = require('path');
var bodyParser = require('body-parser');

app.use(express.static('../assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'../views'));




app.get('/testing', function(req, res) {
	require('../controllers/testingController').index(req,res);
});

app.post('/create/testing', function(req, res) {
	res.send(require('../controllers/testingController').create(req,res));
});

app.post('/edit/testing/:id', function(req, res) {
	res.send(require('../controllers/testingController').update(req,res));
});

app.get('/show/edit/testing/:id', function(req, res) {
	res.send(require('../controllers/testingController').show_edit(req,res));
});

app.get('/delete/testing/:id', function(req, res) {
	res.send(require('../controllers/testingController').erase(req,res));
});

app.listen(port);

console.log('Aurora Serve on port ' + port);