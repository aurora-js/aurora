//get connection function from file compile.js with name aurora_enviroment//
var express = require('../../compile.js');
//get express module//
var express = require('express');
var app     = express();
var table = "";


//declare var con from enviroment//
var enviroment = require('../../compile.js');
var con = enviroment.enviroment();

//function insert//
function insert(req, res){
    console.log(req);
    //contoh : enviroment.query(){
    //              if(err){
    //              "error cuy"
    //              };
    //         }


    //dibawah ini coba2
    var values = {
        name: req.body.name,
        age: req.body.age
       }

    con.query('INSERT INTO members (name, age) VALUES ?', [values], function(err,result){
        if(err) {
            console.log(err);
         }
        else {
            console.log('Success');
         }
    });
    
    //
}

function models(val){
    //sementara function model kosong dulu
    table = val;
}

    module.exports.insert = insert;
    module.exports.models = models;

