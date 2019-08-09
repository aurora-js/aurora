//get connection function from file compile.js with name aurora_enviroment//
var express = require('../core/compile.js');
//get express module//
var express = require('express');
var app = express();
//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');
//declare route for function in sysaura//

function create(req, res) {

    hasil = main.insert({
        'models' : ['mahasiswaModel'],
        "field": ['NIK', 'Email'],
        "result": [
            1,
            '12'
        ]
    });
    console.log(hasil);
    // if(hasil == 'success'){
    //     console,log('berhasil');
    // }else{
    //     console.log(hasil);
    // }
}

function update(req, res) {

    console.log(req.body);
    main.update({
        "models": ['mahasiswa'],
        "set": [
            ["NIK", "=", 4],
            ["password", "=", 4],
            ["id_prodi_fk",'=',4] 
        ],
        "where": [
            ["NIK", "=", 5]
        ],
        "orWhere": [
            ["NIK", "=", 2]
        ]
    }).then(function (q) {
        console.log(q);
    });
    // return res.redirect('/');
}

 //delete function
 function deleteq(req, res) {
    console.log(req.body);
    var deleteq = main.delete_query({
        "table_name" : ['mahasiswa'],
        "where"        :  [
            ["NIK", "=", 1],
            ["password", "=", 1],
            ["id_prodi_fk",'=',1]               
        ],
        "orWhere"      : [
                            ["NIK", "=", 2]                
                        ]
    }).then(function(q){
        
       console.log("bisa delete");
    }); 
    // return res.redirect('../');
    console.log(deleteq);
 }

//get read function from sysaura
function index(req, res) {
    var hasil = main.read({
        "select": ['Email','NIKs','id_prodi_fk'],
        "table_name": ['mahasiswa'],
        'where' : [['NIK','=','2']],
        'orWhere' :[
            ['NIK','=','1'],['EMAIL','=','1']
        ]
    }).then(function (q) {
        res.render('test', {
            page_title: "Dummy - Node.js",
            data: q.data
        });
        console.log(q);
    },function(err){
        try {
            console.log(err.action);
            res.redirect('/edit');
        } catch (error) {
            
        }
    });

    console.log(hasil);
}

function updatelink(req, res) {
    var hasil = main.read({
        "select": ['name', 'age'],
        "table_name": ['members'],
    }).then(function (q) {
        console.log(q);
        res.render('edit', {
            page_title: "Dummy - Node.js",
            data: q
        });

    });

    console.log(hasil);
}


module.exports.create = create;
module.exports.index = index;
module.exports.updatelink = updatelink;
module.exports.update = update;
module.exports.deleteq = deleteq;
