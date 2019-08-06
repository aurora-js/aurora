//get connection function from file compile.js with name aurora_enviroment//
const enviroment = require('../../compile.js');
//get express module//
const express = require('express');
var app     = express();

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

function insert_query(val){
    console.log(val);
        con.query('INSERT INTO ?? (??) VALUES (?) ', [val.table, val.field, val.result], function (err, result) {
                if (err) {
                    console.log("your insert code stucture not match, please check your maincontroller");
                } else {
                   console.log("success")
                }
            });
}

// function update_query(val) { 
//         console.log(val);
//           con.query('UPDATE INTO ?? SET ?? = VALUES(?)' [Val.table, val.field, val.result], function (err,result) {
//                 if (err) {
//                         console.log("your insert code stucture not match, please check your main.update");
//                     } else {
//                        console.log("success");
//                     }   
//           });
        
// }

function drop_query(val) { 
        console.log(val);
          con.query('DROP INTO ?? = VALUES(?)' [Val.table, val.field, val.result], function (err,result) {
                if (err) {
                        console.log("your DROP code stucture not match, please check your main.update");
                    } else {
                       console.log("success");
                    }   
          });
        
}
// function read_query(val){
//         con.query('SELECT ?? FROM ??', [val.select , val.table_name], function(err,result){
//                 if(err){ 
//                        console.log(err,null);  
//                     }else{    
//                         console.log(null,result);
//                     }                   
//                  });
// }
module.exports.query = query;
// module.exports.read_query = read_query;
module.exports.insert_query = insert_query;
module.exports.drop_query = drop_query;
