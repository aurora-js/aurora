//include module command
let command_aurora = require('./module/aurora-command');

//Function for run command module to module
function modules(module,command,value){
    switch (module) {
        case 'DATABASE':
                return database(command,value);
            break;
    
        default:
            break;
    }
}

//Funtion for run to database command module
function database(command,value){
    switch (command) {
        case 'CREATE DATABASE':
                return command_aurora.create_database(command,value);
            break;
    
        default:
            return null;
            break;
    }
}

module.exports.modules = modules;