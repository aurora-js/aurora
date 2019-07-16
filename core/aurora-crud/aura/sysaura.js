//get connection function from file compile.js with name aurora_enviroment//
var express = require('../../compile.js');
//get express module//
var express = require('express');
var app     = express();
var table = "";
var data_read =  "";

//declare var con from enviroment//
var enviroment = require('../../compile.js');
var con = enviroment.enviroment();

//function insert//
function insert(values){
    
  
    console.log(values);
    con.query('INSERT INTO members (name, age) VALUES (?) ', [values], function(err,result){
        if(err) {
            console.log(err);
         }
        else {
            console.log('Success');
         }
    });
    
    //
}

//function read//
function read(req, res,callback){
    //console.log(req, res);
    
    con.connect(function (err) {
        //console.log("Connected");
        var sql = "SELECT * FROM keunggulan";
        con.query(sql, function (err, result) {
            if (err) {
                callback(err,null);
            } else {
                return callback(null,JSON.parse(JSON.stringify(result[0])));
            }
        });
    });
    
};



function models(val){
    //sementara function model kosong dulu
    table = val;
}

    module.exports.insert = insert;
    module.exports.read = read;
    module.exports.models = models;

