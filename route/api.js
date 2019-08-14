var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var path    = require('path');
var bodyParser = require('body-parser');
var sysaura  = require('../controllers/controllersmain');
var create = sysaura.create;

app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    sysaura.index(req,res);
    //res.render('test');
});

app.get('/getmahasiswa', function(req, res) {
   require('../controllers/mahasiswaController').index(req,res);
   //res.render('test');
});

app.post('/simpan', function(req, res) {
   res.send(create(req,res));
});
app.post('/update', function(req, res) {
   res.send(sysaura.update(req,res));
});

app.get('/edit/:name', function(req, res) {
    sysaura.updatelink(req,res);
 });
//routes setelah command generate dari members//

app.get('/members', function(req, res) {
	require('../controllers/membersController').index(req,res);
});

app.post('/create/members', function(req, res) {
	res.send(require('../controllers/membersController').create(req,res));
});

app.post('/edit/members/:name', function(req, res) {
	res.send(require('../controllers/membersController').update(req,res));
});

app.post('/delete/members/:name', function(req, res) {
	res.send(require('../controllers/membersController').erase(req,res));
});

app.listen(port);

console.log('Aurora Serve on port ' + port);