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
        'table_name' : ['members'],
        "field": ['name', 'age'],
        "result": [
            req.body.title,
            req.body.age
        ]
    });
}

function update(req, res) {

    console.log(req.body);
    main.update({
        "table_name": ['membersModel'],
        "set": [
            ["name", "=", req.body.nameupdate],
            ["age", "=", req.body.ageupdate]
        ],
        "where": [
            ["name", "=", req.body.namelama]
        ]
    }).then(function (q) {
        console.log("berhasil update");

    });
    return res.redirect('/');
}

 //delete function
 function erase(req, res) {
    console.log(req.body);
    var deleteq = main.erase_query({
        "table_name" : ['keunggulan'],
        "where"      : [
                            ["name", "=", req.params.title]                
                        ]
    }).then(function(q){
        
       console.log("bisa delete");
    }); 
    // return res.redirect('../');
    console.log(erase);
 }

//get read function from sysaura
function index(req, res) {
    var hasil = main.read({
        "select"        : ['name', 'age'],
        "table_name"    : ['members']
    
    }).then(function (q) {
        res.render('test', {
            page_title: "Dummy - Node.js",
            data: q
        });
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
module.exports.erase = erase;
