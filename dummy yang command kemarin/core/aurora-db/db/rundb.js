let mysql_query = require('../query/mysql');

function run(text){
    return mysql_query.create(text);
}

module.exports.run = run;

