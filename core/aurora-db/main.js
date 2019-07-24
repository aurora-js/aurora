const mysql_grammar = require('./query/mysql');
const schema_run = require('./schema/schemarun');
const schema_update = require('./schema/schemaupdate');
const schema_delete = require('./schema/schemadelete');
const files = require('./schema/file');

var field = '';
var table = '';

//Function main to check db typpe
function main(command, type, value) {
    switch (type) {
        case 'mysql':
            return mysql(command, value);
            break;

        default:
            break;
    }
}

//Function for run schema
function schema(command,type,schema) {
    switch (command) {
        case 'RUN':
            return schema_run.run(type,true,schema);
            break;
        case 'UPDATE':
            return schema_update.run(type,true,schema);
            break;
        case 'DELETE':
            return schema_delete.run(type,true,schema);
            break;
        case 'REFRESH':
            //For delete table
            schema_delete.delete_table(type,false,schema);
            setTimeout(function(){
                //For create table
                schema_run.run(type,false,schema);
                setTimeout(function(){
                    //For update table
                    schema_update.run(type,true,schema);
                }, 2000);
            }, 2000);
            break;
        default:
            break;
    }
}


//Separator value for field and table
function separator_value(value) {

}

//function for run query use mysql grammar
function mysql(command, value) {
    switch (command) {
        case 'CREATE DATABASE':
            return mysql_grammar.create_db(value);
            break;

        default:
            break;
    }
}

//Function for create file schema
function create_schema(name){
    return files.create_file_schema(name);
}

module.exports.main = main;
module.exports.schema = schema;
module.exports.create_schema = create_schema;