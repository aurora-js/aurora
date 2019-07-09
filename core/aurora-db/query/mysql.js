//Get connection enviroment
const compile = require('../../compile');
var con = compile.enviroment;

//function for create database
function create_db(value){
    con = compile.aurora_enviroment_without_db('mysqlnodb');
    con.query("CREATE DATABASE "+value, function (err, result) {
        if (err){
            console.log('WARNING!\nDatabase '+ value +' not created');
        }else{
            console.log('YEAY!\nDatabase '+ value +' successfully created');
        }
        return process.exit();
    });
}

//Function create table
function create_table(table,field){
    console.log(table);
}

module.exports.create_db = create_db;
module.exports.create_table = create_table;