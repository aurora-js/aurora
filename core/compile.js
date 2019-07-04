//Get main function Aurora Enviroment
var aurora_enviroment_module = require('./aurora-enviroment/main');

//Run serve
function serve(){
    require('../route/api');
}

//Run enviroment with
/*
Parameter :
1. Name config (Default config.js)
*/
function aurora_enviroment(){
    return aurora_enviroment_module.main(require('../app').enviroment);
}

module.exports.aurora_enviroment = aurora_enviroment;
module.exports.serve = serve;
module.exports.enviroment = aurora_enviroment;