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

//function index(req,res){
  //  return main.read(req,res);    
//}

//get read function from sysaura
function index(req, res) {
    return  main.read({
        "select" : ['deskripsi'] , 
        "table_name" : ['keunggulan'] ,
        "where" : ['deskripsi'] ,
        "any" : ['1234']
    },
     function(err, data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            console.log("result from db is : ",data);  
            res.render('test',{page_title:"Dummy - Node.js",data:data}); 
        }    
    }
    
    );
    
    
}


module.exports.create = create;
module.exports.index = index;