//get connection function from file compile.js with name aurora_enviroment//
var express = require('../../compile.js');
//get express module//
var express = require('express');
var app     = express();
var table = "";

//declare var con from enviroment//
var enviroment = require('../../compile.js');


function main(){

    module.exports.insert = insert;
    module.exports.models = models;

}

//function insert//
function insert(){
    //contoh : enviroment.query(){
    //              if(err){
    //              "error cuy"
    //              };
    //         }


    //dibawah ini coba2
    var data = [{id:1, name: "one"},{id: 2, name: "two"}];
    return data;
    //


}

function models(val){
    //sementara function model kosong dulu
    table = val;
}

module.exports.main = main;
