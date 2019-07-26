//Get main function Aurora Enviroment
var aurora_enviroment_module = require('./aurora-enviroment/main');
var aurora_db_module = require('./aurora-db/main');
var aurora_command_module = require('./aurora-command/main');
var app = "";

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
    app = require('../app');
    return aurora_enviroment_module.main(app.config_enviroment);
}

//Run enviroment without db
/*
Parameter :
1. Name config (Default config.js)
*/
function aurora_enviroment_without_db(custom_db) {
    app = require('../app');
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
*/
function aurora_schema(command,schema) {    
    var config = aurora_get_config();
    return aurora_db_module.schema(command, config.config.db_type, schema);
}

/*
Run for create schema file
*/
function aurora_create_schema(name) {
    return aurora_db_module.create_schema(name);
}


//Function For Get Config Value From User
function aurora_get_config() {
    app = require('../app');
    return aurora_enviroment_module.get_config(app.config_enviroment);
}

module.exports.serve = serve;
module.exports.enviroment = aurora_enviroment;
module.exports.aurora_enviroment_without_db = aurora_enviroment_without_db;
module.exports.db = aurora_db;
module.exports.command = aurora_command;
module.exports.schema = aurora_schema;
module.exports.create_schema = aurora_create_schema;
module.exports.get_config = aurora_get_config;