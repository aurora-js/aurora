var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var path    = require('path');
var bodyParser = require('body-parser');
var sysaura  = require('../controllers/controllersmain');

app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

var obj = {};
app.get('/', function(req, res) {
    // var obj = {data : sysaura.index(req,res)};
   /*  sysaura.index(req,res,function(err,data){
        if(err){
            console.log(err);
        }else{
            //console.log(data);
            res.render('test', sysaura.index(req,res));
        }
    });
    */
   res.render('test', sysaura.index(req,res));
});

app.post('/simpan', function(req, res) {
   res.send(sysaura.create(req,res ));
});

app.listen(port);
console.log('Magic happens on port ' + port);