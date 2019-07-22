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
}

function run(val){
    var json = JSON.stringify(val, function (key, value) {
        if (typeof value === "function") {
            return "/Function(" + value.toString() + ")/";
        }
        return value;
    });

    var obj2 = JSON.parse(json, function (key, value) {
        if (typeof value === "string" &&
            value.startsWith("/Function(") &&
            value.endsWith(")/")) {
            value = value.substring(10, value.length - 2);
            return eval("(" + value + ")");
        }
        return value;
    });

    //For run function in json
    obj2();
}

//function read//
function read(req, res){
    //console.log(req, res);
    
    con.query('SELECT * FROM members', function(err,rows)     {
 
        if(err){
         
         res.render('test',{page_title:"Dummy - Node.js",data:''});   
        }else{
            
            res.render('test',{page_title:"Dummy - Node.js",data:rows});
        }
                            
         });
    
};



function models(val) {
    //sementara function model kosong dulu
    table = val;
}

module.exports.insert = insert;
module.exports.read = read;
module.exports.models = models;