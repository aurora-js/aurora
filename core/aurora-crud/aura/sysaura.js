//get connection function from file compile.js with name aurora_enviroment//
var express = require('../../compile.js');
//get express module//
var express = require('express');
var app     = express();
//declare var con from enviroment//

//function insert//
function insert(){
    var data = [{id:1, name: "one"},{id: 2, name: "two"}];
    
    return data;
}

module.exports = insert;
