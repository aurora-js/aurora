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

 //delete function
 function deleteq(req, res) {
    console.log(req.body);
    var deleteq = main.delete_query({
        "table_name" : ['keunggulan'],
        "where"      : [
                            ["title", "=", req.params.title]                
                        ]
    }).then(function(q){
        
       console.log("bisa delete");
    }); 
    // return res.redirect('../');
    console.log(deleteq);
 }

//get read function from sysaura
function index(req, res) {
    var hasil = main.read({
        "select"     : ['title','deskripsi'] , 
        "table_name" : ['keunggulan'] ,
        "where"      : [
                            ["title", "=", "wow"], ["title", "=", "Hallo"]
                        ],
        "orWhere"      : [
                            ["deskripsi", "=", "1234"], ["deskripsi", "like", "%a%"]                
                        ]
    }).then(function(q){
        res.render('test',{page_title:"Dummy - Node.js",data:q}); 
    });   

    console.log(hasil);
}
function update(req, res) {
    return   res.render('edit'); 
}


module.exports.create = create;
module.exports.index = index;
module.exports.update = update;
module.exports.deleteq = deleteq;
