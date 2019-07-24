//get connection function from file compile.js with name aurora_enviroment//
var express = require('../core/compile.js');
//get express module//
var express = require('express');
var app = express();
//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');
//declare route for function in sysaura//

function create(req, res) {
    var values = [
        req.body.name,
        req.body.age
    ];

    
    main.run({
        function(){
            models().insert(values);
        }
    });

    return main.insert(values, req,res);
}

//function index(req,res){
  //  return main.read(req,res);    
//}

//get read function from sysaura
function index(req, res) {
    return  main.read({
        "select" : ['title','deskripsi'] , 
        "table_name" : ['keunggulan']
    }, function(err, data){
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