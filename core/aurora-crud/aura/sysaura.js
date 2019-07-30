//get connection function from file compile.js with name aurora_enviroment//
var express = require('../../compile.js');
//get express module//
var express = require('express');
var app = express();
var DB = "";

//declare var con from enviroment//
var enviroment = require('../../compile.js');
var con = enviroment.enviroment();
var aura = require('../query/mysql.js');
var get_config = enviroment.get_config();

function fetch_json_models(field,value){
    var json = "{";

    field.forEach(function(element,index){
        json = json + "\""+element+"\""+":"+"\""+value[index]+"\"";
        if(value[index+1] != undefined){
            json = json + ',';
        }
    });
    json = json + '}';

    return JSON.parse(json);
}
function run(val){
     
    if (val.insert != ""){
        insert(val.insert);
    }
    // var json = JSON.stringify(val.query, function (key, value) {
    //     if (typeof value === "function") {
    //         return "/Function(" + value.toString() + ")/";
    //     }
    //     return value;
    // });

    // var obj2 = JSON.parse(json, function (key, value) {
    //     if (typeof value === "string" &&
    //         value.startsWith("/Function(") &&
    //         value.endsWith(")/")) {
    //         value = value.substring(10, value.length - 2);
    //         console.log(value);
    //         return eval("(" + value + ")");
    //     }
    //     return value;
    // });
    // console.log(obj2);
    //obj2();

}


//function insert///
function insert(val) {
    
    if(val.models != ""){
        var json_model = fetch_json_models(val.field,val.result);
        var response_model = enviroment.model(val.models,'create',json_model);
        console.log(response_model);
    }
    //console.log(val);
    //basic insert code without relation//
    // "con" get from variable then use .query() for setting code query for store data to mysql
    // use parameter values as aurora parameter default
    // the the values can be use in .query setting code
    switch (get_config.config.db_type) {
        case 'mysql':
    
            require('../query/mysql').insert_query(val);
    
            break;
    
        default:
            break;
    }
    
}



//function read//
function read(val,callback){
    if(val.models != ""){
        // models(val.models);
    }   
     aura.read_query(val,callback);
};



// function models() {
//     //sementara function model kosong dulu
//     console.log("bisadong");
// }

module.exports.insert = insert;
module.exports.read = read;
// module.exports.models = models;
module.exports.run = run;