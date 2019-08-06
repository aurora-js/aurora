//get connection function from file compile.js with name aurora_enviroment//
var express = require('../core/compile.js');
//get express module//
var express = require('express');
var app = express();
//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');
//declare route for function in sysaura//

function create(req, res) {
    
    return main.insert({
        "table" : ['members'],
        "field" : ['name','age'],
        "result" : [
            req.body.title,
            req.body.deskripsi
        ]
     });
 
 }
 
 function update(req, res) {
    console.log(req.body);
    var update = main.update({
        "table_name" : ['members'] ,
        "set"        : [
                            ["name", "=", req.body.titleupdate],
                            ["age", "=", req.body.ageupdate]
        ],
        "where"      : [
                            ["name", "=", req.body.title]                
                        ]
    }).then(function(q){
       console.log("bisa update");
    }); 

    console.log(update);
 }

//get read function from sysaura
function index(req, res) {
    var hasil = main.read({
        "select"     : ['name','age'] , 
        "table_name" : ['members'] ,

    }).then(function(q){
        res.render('test',{page_title:"Dummy - Node.js",data:q}); 
    });   

    console.log(hasil);
}


module.exports.create = create;
module.exports.index = index;
module.exports.update = update;