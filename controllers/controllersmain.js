//get connection function from file compile.js with name aurora_enviroment//
var express = require('../core/compile.js');
//get express module//
var express = require('express');
var app     = express();
//declare var con from enviroment//
var main  = require('../core/aurora-crud/aura/sysaura');
//declare route for function in sysaura//

function create(req,res){
    //contoh 
    //
    //
    //      
    //      
    //
    //            
    //
    //endcontoh

    var values = [
        req.body.name,
         req.body.age
    ];

    return main.insert(values);
}

module.exports.create = create;

