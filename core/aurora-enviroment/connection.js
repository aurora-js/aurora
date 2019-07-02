//create connection

var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "aurora"
});

db.connect(function (err) {
    if (err) {
        console.log("ERROR!, database host not defined!");
    } else {
        console.log("CONNECTED");
    }
});

