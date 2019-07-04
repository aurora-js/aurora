var express = require('express');
var app     = express();
var port    =   process.env.PORT || 8080;


app.get('/sample', function(req, res) {
    res.send('this is a sample!');  
});


app.listen(port);
console.log('Magic happens on port ' + port);