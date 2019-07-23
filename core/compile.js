//Get main function Aurora Enviroment
var aurora_enviroment_module = require('./aurora-enviroment/main');
var aurora_db_module = require('./aurora-db/main');
var aurora_command_module = require('./aurora-command/main');
var app = require('../app');

//Run serve
function serve() {
    require('../route/api');
}

//Run enviroment with
/*
Parameter :
1. Name config (Default config.js)
*/
function aurora_enviroment() {
    return aurora_enviroment_module.main(app.config_enviroment);
}

//Run enviroment without db
/*
Parameter :
1. Name config (Default config.js)
*/
function aurora_enviroment_without_db(custom_db) {
    return aurora_enviroment_module.main_without_db(app.config_enviroment, custom_db);
}

/*
Run aurora db
*/
function aurora_db(command, type, value) {
    return aurora_db_module.main(command, type, value);
}


/*
Run aurora command for module to module
*/
function aurora_command(module, command, value) {
    return aurora_command_module.modules(module, command, value);
}

/*
Run aurora schema
! Change mysql from enviroment !
TODO : Tambah fungsi mysql bisa dari enviroment
*/
function aurora_schema(command) {
    return aurora_db_module.schema(command, 'mysql');
}

/*
Run for create schema file
*/
function aurora_create_schema(name) {
    return aurora_db_module.create_schema(name);
}

module.exports.serve = serve;
module.exports.enviroment = aurora_enviroment;
module.exports.aurora_enviroment_without_db = aurora_enviroment_without_db;
module.exports.db = aurora_db;
module.exports.command = aurora_command;
module.exports.schema = aurora_schema;
module.exports.create_schema = aurora_create_schema;