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
        "table_name": ['members'],
        "set": [
            ["name", "=", req.body.nameupdate],
            ["age", "=", req.body.ageupdate]
        ],
        "where": [
            ["name", "=", req.body.namelama]
        ]
    }).then(function (q) {
        try {
            console.log(q);
            console.log("berhasil update");
            //res.redirect('/edit');
        } catch (error) {
            
        }
    },function(err){
        try {
            console.log(err.action);
        } catch (error) {
            
        }
    });
}

 //delete function
 function erase(req, res) {
    console.log(req.body);
    var erase = main.erase_query({
        "table_name" : ['keunggulan'],
        "where"      : [
                            ["name", "=", req.params.title]                
                        ],
        "orWhere"      : [
                            ["name", "=", req.params.title]                
                        ],
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
        // res.render('test', {
        //     page_title: "Dummy - Node.js",
        //     data: q
        // });
        try {
            res.render('test', {
            page_title: "Dummy - Node.js",
            data: q
        });
        } catch (error) {
            
        }
    },function(err){
        try {
            console.log(err.action);
            // res.redirect('/edit');
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
module.exports.erase = erase;
