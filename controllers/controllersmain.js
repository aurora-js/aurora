//get connection function from file compile.js with name aurora_enviroment//
var express = require('../core/compile.js');
//get express module//
var express = require('express');
var app = express();
//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');
//declare route for function in sysaura//

function create(req, res) {
    
    main.run({
        models : "members",
        insert : [
            req.body.name,
             req.body.age
        ],
        req : req,
        res : res
     });
 
 }

function index(req,res){
    return main.read(req,res);  
}

module.exports.create = create;
module.exports.index = index;