//get express module//
var express = require('express');
var app     = express();

//declare var con from enviroment//
var enviroment = require('../../compile.js');
var con = enviroment.enviroment();


//For run query (It's universal)
//Function query must have parameter sytax query and callback for return response after run query
//If parameter value have some value, then query run with value
function query(syntax,value,callback){
        //If parameter value have some value
        if(value != null && value != "" && value != " " && value != undefined){
                con.query(syntax, value, function(err,result){
                        if(err){
                                console.log(err); 
                                return callback(err,null);  
                        }else{    
                                return callback(null,result);
                        }                   
                });
        }else{
                con.query(syntax, function(err,result){
                        if(err){
                                console.log(err); 
                                return callback(err,null);  
                        }else{    
                                return callback(null,result);
                        }                   
                });   
        }
}

module.exports.query = query;