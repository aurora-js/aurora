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

//function insert///
function insert_with_model(val) {
    //basic insert//
    // use parameter val as aurora parameter default
    // val can be use in .query setting code
    
    if(val.models != "" && val.models != undefined){
        //model validation//
        var json_model = fetch_json_models(val.field,val.result);
        var response_model = enviroment.model(val.models,'create',json_model);
        if (response_model.action != true) {
            //model validation fail//
            console.log(response_model);
            console.log("please make sure check your model validation with your mysql field validation");
        }else{
            //model validation success//
            console.log(response_model);
             //query type validation//
            switch (get_config.config.db_type) {
               //query setting mysql//
                case 'mysql':
                    //call query setting in forlder query with file mysql, run function insert_query
                    require('../query/mysql').insert_query(val);
            
                    break;
            
                default:
                    break;
            }
        }
       
    }else{
        console.log(response_model);
        console.log("Please make sure you have model or check your model name")
    }
    
}

//function insert///
function insert(val) {
    //basic insert//
    // use parameter val as aurora parameter default
    // val can be use in .query setting code
    
    //query type validation//
    switch (get_config.config.db_type) {
        //query setting mysql//
         case 'mysql':
             //call query setting in forlder query with file mysql, run function insert_query
             require('../query/mysql').insert_query(val);
     
             break;
     
         default:
             break;
     }
    
}

function update(val) {
    switch (get_config.config.db_type) {
        case 'mysql':
    
            require('../query/mysql').update_query(val);
    
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
 //con.query('SELECT * FROM keunggulan', function(err,rows)     {
   //    if(err){ 
     //   res.render('test',{page_title:"Dummy - Node.js",data:''});   
    //}else{     
      //    res.render('test',{page_title:"Dummy - Node.js",data:rows});
       // }                   
     //});
    
     aura.read_query(val,callback);
};


module.exports.insert = insert;
module.exports.insertWithModel = insert_with_model;

module.exports.read = read;
// module.exports.models = models;

module.exports.update = update;