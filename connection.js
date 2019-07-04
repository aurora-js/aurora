var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"aurora"
});

con.connect(function (err){
    if(err){
        if(err.errno == 'ENOTFOUND'){
            console.log('Koneksi Tidak Ada');
        }
    }else{
        console.log('Terhubung');
    }
});

module.exports.db = con;
