//create connection
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
var mysql = require('mysql');


app.use(bodyparser.json());

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aurora"
});

app.listen(3000, () => console.log('server on port 3000'));

db.connect(function (err) {
    if (err) {
        console.log("ERROR!, database host not defined!");
    } else {
        console.log("CONNECTED");

        //create database

        // var sql = "CREATE TABLE coba (nim INT(10) PRIMARY KEY, nama VARCHAR(50))";
        // db.query(sql, function (err, result) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log("Table created");
        //     }
        // })
    }
});

//delete table
// var sql = "DROP TABLE aurora_table";
// db.query(sql, function (err, result) {
//     if (err) {
//         console.log("error delete table!");
//     } else {
//         console.log("delete success!");
//     }
// })

//update database
//db.query("SELECT * ALTER table FROM coba add code", function (err, result, fields) {
//  if (err) {
//    console.log("error get column table database");
// } else {
//   console.log("update column database success")
// }
//});

//function node js mysql
// db.query("SELECT * FROM coba", function (err, result, fields) {
//     if (err) {
//         console.log("error get function");
//     } else {
//         console.log("success get function")
//     }
// });

//function create table
function create_table(name) {
    var sql = "CREATE TABLE " + name + " (nim INT(10) PRIMARY KEY, nama VARCHAR(50))";
    console.log(sql);
    db.query(sql, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("success create table")
        }
    })
};

create_table('dhoni');



















