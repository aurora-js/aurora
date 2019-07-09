var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;
var path    = require('path');
var sysaura  = require('../controllers/controllersmain');

app.use(express.static('../public'));

app.get('/myfile', function(req, res) {
    res.sendFile(path.join(__dirname+ '/../public/myfile.html'));
});

app.listen(port);
console.log('Magic happens on port ' + port);