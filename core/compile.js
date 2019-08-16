//Get main function Aurora Enviroment
var aurora_command_module = require('./aurora-command/main');

var app = "";

/*
Run aurora command for module to module
*/
function aurora_command(module, command, value) {
    return aurora_command_module.modules(module, command, value);
}

module.exports.command = aurora_command;
