//get connection function from file compile.js with name aurora_enviroment//
var express = require('../../compile.js');
//get express module//
var express = require('express');
var app = express();
var table = "";
var data_read = "";

//declare var con from enviroment//
var enviroment = require('../../compile.js');
var con = enviroment.enviroment();

//function insert///
function insert(values) {
    
    console.log(values);
    //basic insert code without relation//
    // "con" get from variable then use .query() for setting code query for store data to mysql
    // use parameter values as aurora parameter default
    // the the values can be use in .query setting code
    con.query('INSERT INTO members (name, age) VALUES (?) ', [values], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Success');
        }
    });

    //
}

//function read//
function read(req, res) {
    //console.log(req, res);


};



function models(val) {
    //sementara function model kosong dulu
    table = val;
}

module.exports.insert = insert;
module.exports.read = read;
module.exports.models = models;