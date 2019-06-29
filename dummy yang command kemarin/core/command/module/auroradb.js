let db = require('../../aurora-db/main');

function aurora_db(module,text){
    return db.main(module,text);
}

module.exports.aurora_db = aurora_db;
