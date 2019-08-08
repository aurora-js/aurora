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

app.post('/simpan', function(req, res) {
   res.send(create(req,res));
});
app.post('/update', function(req, res) {
   res.send(sysaura.update(req,res));
});

app.get('/edit/:name', function(req, res) {
    sysaura.updatelink(req,res);
 });

 var findTitleBytitle = function (title, callback) {
    // Perform database query that calls callback when it's done
    // This is our fake database
    if (!delete[title])
      return callback(new Error(
        'No user matching '
         + title
        )
      );
    return callback(null, delete[title]);
  };

 app.get('/delete/:title', function(req, res, next) {
    var title = req.params.title;
    findTitleBytitle(title, function(error, title) {
        if (error) return next(error);
   return sysaura.erase(req,res);
    });
 });

app.listen(port);
console.log('Magic happens on port ' + port);