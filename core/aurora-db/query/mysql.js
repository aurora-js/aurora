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

module.exports.create_db = create_db;