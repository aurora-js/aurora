//create connection

const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aurora"
});

db.connect(function (err) {
    if (err) {
        res.send("ERROR!, database host not defined!");
    } else {
        console.log("CONNECTED");
    }
});

app.listen(3000, () => console.log('server on port 3000'));


//get database
app.get('/auroratest', (req, res) => {
    mysqlConnection.query('SELECT * FROM aurora_table', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//create database
app.get('/auroratest/1', (req, res) => {
    mysqlConnection.query('SELECT * FROM aurora_table WHERE id_user =?', [req, params.id], (err, result, fields) => {
        if (!err) {
            res.send("success,Create database");
        } else {
            console.log("ERROR, Create database");
        }
    })
});

//delete database
app.delete('/auroratest/1', (req, res) => {
    mysqlConnection.query('SELECT * FROM aurora_table WHERE id_user=?', [req.params.id], (err, result, fields) => {
        if (!err) {
            res.send("success deleted");
        } else {
            console.log("error deleted");
        }
    })
});

//update database
app.put('/auroratest', (req, res) => {
    let keseluruhan = req.body;
    var datatable = "SET @id_user = ?;SET @Nama = ?;SET @kelas = ?;SET @notlp = ?; \
    CALL AuroraAddOrEdit(@id_user,@nama,@kelas,@notlp);";
    mysqlConnection.query(datatable, [keseluruhan.id_user, keseluruhan.nama, keseluruhan.kelas, keseluruhan.notlp],
        (err, result, fields) => {
            if (!err)
                res.send("success update");
            else
                console.log("error deleted");
        })
});








