//get connection function from file compile.js with name aurora_enviroment//
var express = require('../../compile.js');
//get express module//
var express = require('express');
var app     = express();
//declare var con from enviroment//
var sysaura  = require('../core/aurora-crud/aura/sysaura');
//declare route for function in sysaura//

function create(){
    sysaura.models('').insert(val);
}

module.exports.create = create;

