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
var query_read = "";

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

function create_attr_read(val){
    if(val.where != undefined){
        console.log(val.where);
        if (val.where.length > 1){
            val.where.forEach(function(element,index){
                
                console.log(element);
                if (index == 0){
                    query_read = query_read + " WHERE";
                }
                    query_read = query_read +" "+ element[0] +" "+ element[1] +" "+ element [2];
                if(val.where[index+1] != undefined){
                    query_read = query_read + " " + "AND";
                }
            });
            query_read = query_read;
            console.log(query_read);
        }else{
        }
    }
 }
    
// function run(val){
     
//     if (val.insert != ""){
//         insert(val.insert);
//     }
//     // var json = JSON.stringify(val.query, function (key, value) {
//     //     if (typeof value === "function") {
//     //         return "/Function(" + value.toString() + ")/";
//     //     }
//     //     return value;
//     // });

//     // var obj2 = JSON.parse(json, function (key, value) {
//     //     if (typeof value === "string" &&
//     //         value.startsWith("/Function(") &&
//     //         value.endsWith(")/")) {
//     //         value = value.substring(10, value.length - 2);
//     //         console.log(value);
//     //         return eval("(" + value + ")");
//     //     }
//     //     return value;
//     // });
//     // console.log(obj2);
//     //obj2();

// }


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
function read(val){
    var select = "*";
    var table_name = "";

    if(val.table_name != undefined){
        table_name = val.table_name[0];
    }

    if(val.select != undefined){
        select = val.select;
    }
    
    if(val.models != "" && val.models != undefined){
        var response_model = enviroment.model(val.models,null,[]);
        table_name = response.table_name;
    };

    query_read = query_read + "SELECT  "+ select +" FROM "+table_name;
    console.log(query_read);

   create_attr_read(val);

    
    // switch (get_config.config.db_type) {
    //     case 'mysql':
    //         require('../query/mysql').read_query(val);
        
    //         break;  
    //     default:
    //         break;
    // }
    // query_read = query_read + "SELECT ?? FROM ??";
}


// function models() {
//     //sementara function model kosong dulu
//     console.log("bisadong");
// }

module.exports.insert = insert;
module.exports.read = read;
// module.exports.models = models;
//module.exports.run = run;