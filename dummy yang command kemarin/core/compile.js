let db = require('./aurora-db/main');

function aurora_db(module){
    db.main(module);
}

module.exports.aurora_db = aurora_db;