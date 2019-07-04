//create connection
var mysql = require('mysql');

/*
Check database type for same with syntax query
*/
function connect(config){
    switch (config.config.db_type) {
        case 'mysql':
            return connection_mysql(config.config);
            break;
    
        default:
            console.log('ERROR!\nDatabase Type Not Found');
            return process.exit();
            break;
    }
}

/*
Run configuration for database type mysql
*/
function connection_mysql(config){
    var db = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        database: config.database
    });
    
    db.connect(function (err) {
        if (err) {
            console.log("ERROR!\nDatabase host not defined!");
            return process.exit();
        } 
    });
    
    return db;
}

module.exports.connect = connect;


