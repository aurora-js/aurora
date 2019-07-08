var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;
var path    = require('path');
var sysaura  = require('../core/aurora-crud/aura/sysaura');

app.use(express.static('../public'));

app.get('/myfile', function(req, res) {
    res.send(sysaura.insert());
    // console.log(res);
});

app.listen(port);
console.log('Magic happens on port ' + port);