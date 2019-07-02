//Get main function Aurora Enviroment
var aurora_enviroment_module = require('./aurora-enviroment/main');

//Run serve
function serve(){
    require('../route/api');
}

//For config.js 
function aurora_enviroment(){
    aurora_enviroment_module.main();
}

module.exports.aurora_enviroment = aurora_enviroment;
module.exports.serve = serve;