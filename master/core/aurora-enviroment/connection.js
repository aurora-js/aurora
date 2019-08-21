//Include module
var compile = require('../compile');

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
        case 'mysqlnodb':
            return connection_mysql_without_db(config.config);
            break;
        default:
            console.log('ERROR!\nDatabase type not found');
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
        database: config.database,
        multipleStatements: true
    });
    
    db.connect(function (err) {
        if(err){
            switch (err.errno) {
                case 1049:
                        console.log("ERROR!\nDatabase not found!");
                        return compile.command('DATABASE','CREATE DATABASE',{database : config.database, type : config.db_type});
                    break;
                case 'ENOTFOUND' :
                        console.log("ERROR!\nHost not found!");
                        return process.exit();
                    break;
                case 'ECONNREFUSED' :
                        console.log("ERROR!\nPort not found!");
                        return process.exit();
                    break;
                case 'ER_ACCESS_DENIED_ERROR' :
                        console.log("ERROR!\nYour user or password database is wrong!");
                        return process.exit();
                    break;
                default:
                        console.log("ERROR!\nCheck your config.js!");
                        return process.exit();
                    break;
            }
        }
    });
    
    return db;
}


/*
Run configuration for database type mysql without database
*/
function connection_mysql_without_db(config){
    var db = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        multipleStatements: true
    });
    
    db.connect(function (err) {
        if(err){
            switch (err.errno) {
                case 'ENOTFOUND' :
                        console.log("ERROR!\nHost not found!");
                        return process.exit();
                    break;
                case 'ECONNREFUSED' :
                        console.log("ERROR!\nPort not found!");
                        return process.exit();
                    break;
                case 'ER_ACCESS_DENIED_ERROR' :
                        console.log("ERROR!\nYour user or password database is wrong!");
                        return process.exit();
                    break;
                default:
                        console.log("ERROR!\nCheck your config.js!");
                        return process.exit();
                    break;
            }
        }
    });
    
    return db;
}
module.exports.connect = connect;


