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




app.get('/members', function(req, res) {
	require('../controllers/membersController').index(req,res);
});

app.post('/create/members', function(req, res) {
	res.send(require('../controllers/membersController').create(req,res));
});

app.put('/edit/members/:id', function(req, res) {
	res.send(require('../controllers/membersController').update(req,res));
});

app.get('/show/edit/members/:id', function(req, res) {
	require('../controllers/membersController').show_edit(req,res);
});

app.get('/delete/members/:id', function(req, res) {
	res.send(require('../controllers/membersController').erase(req,res));
});

app.listen(port);

console.log('Aurora Serve on port ' + port);