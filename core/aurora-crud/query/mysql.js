//get connection function from file compile.js with name aurora_enviroment//
const enviroment = require('../../compile.js');
//get express module//
const express = require('express');
var app     = express();
var con = enviroment.enviroment();
function query(val){
    console.log(val);
        con.query('INSERT INTO ?? (??) VALUES (?) ', [val.table, val.field, val.result], function (err, result) {
                if (err) {
                    console.log("your insert code stucture not match, please check your main.insert");
                } else {
                   console.log("success");
                }
            });
}

module.exports.query = query;