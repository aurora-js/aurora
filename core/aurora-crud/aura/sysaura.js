//get connection function from file compile.js with name aurora_enviroment//
var express = require('./compile.js.js');

//declare var con from enviroment//
var con = enviroment();

//function insert//
function insert{
    enviroment.query();
}

//function update//
function update{
    enviroment.query();
}

module.exports.insert = insert;
module.exports.update = update;