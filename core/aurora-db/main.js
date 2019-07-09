const mysql_grammar = require('./query/mysql');
const schema_run = require('./schema/schemarun');

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
function schema(command,type) {
    switch (command) {
        case 'RUN':
            return schema_run.run(type);
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

module.exports.main = main;
module.exports.schema = schema;