//Get main function Aurora Enviroment
var aurora_enviroment_module = require('./aurora-enviroment/main');
var aurora_db_module = ('./aurora_db_module/main');

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

/*
Run aurora db
*/
function aurora_db(type,value){
    return aurora_db_module.main(type,value);
}

module.exports.serve = serve;
module.exports.enviroment = aurora_enviroment;
module.exports.db = aurora_db;