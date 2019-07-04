//create connection
var mysql = require('mysql');

function connect(config){
    switch (config.db_type) {
        case 'mysql':
            return connection_mysql(config);
            break;
    
        default:
            console.log('ERROR!\nDatabase Type Not Found');
            return process.exit();
            break;
    }
}

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
            console.log("ERROR!, database host not defined!");
        } else {
            console.log("CONNECTED");
        }
    });
}

module.exports.connect = connect;


