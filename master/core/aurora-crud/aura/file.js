var fs = require("fs");
var compile = require('../../compile.js');
var response_rules = null;

//function for create model file 
function create_file_model(name,table,generate){
    return new Promise(function(resolve,reject){
        var rules = null;

        if(generate != null && generate != "" && generate != " " && generate != undefined && generate == true){
                return generate_rules(table).then(function(data){
                    create_file(table,name,response_rules).then(function(){
                        resolve();
                    },function(){
                        reject();
                    });
                });     
        }else{
            return create_file(table,name).then(function(){
                resolve();
            },function(err){
                reject(err);
            });
        }
    });

}

//function for generate value rules from table
function generate_rules(table){
    return new Promise(resolve => {
        if(table != null && table != "" && table != " " && table != undefined){
            //check db type
            var get_config = compile.get_config();
    
            switch (get_config.config.db_type) {
                case 'mysql':
                    require('../query/mysql').query("SHOW COLUMNS FROM "+table, null, function(err, data){
                        if (err) {
                            // if error
                            console.log('ERROR!\n',err);            
                        } else {        
                            // get data field from table
                            response_rules = generate_rules_data(data);
                            resolve();
                        } 
                    });
                    break;
            
                default:
                    break;
            };
        }else{
            //If no table name
            console.log('ERROR!\n' + 'Table Name Not Found');
            return process.exit();
        }
    });
}

function generate_rules_data(data){
    var field = [];
    var rules = [];
    //Foreach field and check type and nullable field
    if(data.length > 0){
        var generate_rules = "";
        
        data.forEach(function (element, index){
            field.push(element.Field);
            var another = false;
            //If have integer add to number rules
            if(element.Type.includes('int') && element.Extra != "auto_increment"){
                if(rules[index] != undefined && rules[index] != null && rules[index] != ""){
                    rules[index][rules[index].length] = 'number';
                }else{
                    rules[index] = ['number'];
                }
            }

            //If type is string
            if(element.Type.includes('varchar') || element.Type.includes('char') || element.Type.includes('text')){
                if(rules[index] != undefined && rules[index] != null && rules[index] != ""){
                    rules[index][rules[index].length] = 'string';
                }else{
                    rules[index] = ['string'];
                }
            }

            //If type is boolean
            if(element.Type.includes('boolean')){
                if(rules[index] != undefined && rules[index] != null && rules[index] != ""){
                    rules[index][rules[index].length] = 'boolean';
                }else{
                    rules[index] = ['boolean'];
                }
            }

            //If not nullable add required in rules
            if(element.Null == "YES" && element.Extra != "auto_increment"){
                if(rules[index] != undefined && rules[index] != null && rules[index] != ""){
                    rules[index][rules[index].length] = 'required';
                }else{
                    rules[index] = ['required'];
                }
            }
            //!----------------------------------------------------- For name field ---------------------!
            var name_field = element.Field.toLowerCase();
            //If name field is email, add rules input must email
            // ? Name Field must email or EMAIL 
            if(name_field == "email"){
                if(rules[index] != undefined && rules[index] != null && rules[index] != ""){
                    rules[index][rules[index].length] = 'email';
                }else{
                    rules[index] = ['email'];
                }
            }

            //If name field is password, add rules add password_confirmation
            // ? Name Field must password or PASSWORD 
            if(name_field == "password"){
                if(rules[index] != undefined && rules[index] != null && rules[index] != ""){
                    rules[index][rules[index].length] = 'password_confirmation';
                }else{
                    rules[index] = ['password_confirmation'];
                }
            }

            //!------------------------------------------------------------------------------------------!
        });

        //Generate sytax for model
        generate_rules = generate_rules + "{\n\t";
        field.forEach(function (element, index){
            //add field
            generate_rules = generate_rules + element +" : \"";
            //For generate rules in field
            if(rules[index] != undefined && rules[index].length > 0){
                rules[index].forEach(function (element_rules, index_rules){
                    generate_rules = generate_rules + element_rules;
                    //For add comma
                    if(rules[index][index_rules+1] != undefined){
                        generate_rules = generate_rules + ",";
                    }
                });
            }

            //For add comma
            if(field[index+1] != undefined){
                generate_rules = generate_rules + "\",\n\t";
            }else{
                generate_rules = generate_rules + "\"";
            }
        });
        generate_rules = generate_rules + "\n};\n";

        return generate_rules;
    }else{
        return null;
    }
}


//Function for run create table 
function create_file(table,name,rules){
    return new Promise(function(resolve,reject){
        var table_name = "";

        //Check table name
        if(table != null && table != "" && table != " " && table != undefined){
            table_name = table;
        }
        
        //Change space to underscore and Uppercase to Lowercase or name file
        var name_file = name.split(' ').join('_');

        //For table name
        var syntax = "module.exports.table_name = \""+table_name+"\";\n\n";
        
        //If not with generate rules
        if(rules == null){
            //For rulesOnCreate
            syntax = syntax + "module.exports.rulesOnCreate = {\n\n};\n\n";

            //For rulesOnUpdate
            syntax = syntax + "module.exports.rulesOnUpdate = {\n\n};\n\n";

        }else{
            //For rulesOnCreate if have rules
            syntax = syntax + "module.exports.rulesOnCreate = "+rules+"\n\n";

            //For rulesOnUpdate if have rules
            syntax = syntax + "module.exports.rulesOnUpdate = "+rules+"\n\n";
        }

        //Create file to ./model/
        fs.appendFile('./model/'+name_file+'.js', syntax, function (err) {
            if (err){
                reject(err);
            };

            //Return command successfully
            console.log('File Model '+name+'.js'+' is created successfully.');
            return resolve();
        });
    });
}


//Function for run create table 
function create_crud_file(name,model){
   return new Promise(function(resolve,reject){
        var model_name = "";
        var function_insert =" ";
        var function_read =" ";
        var function_update =" ";
        var function_erase =" ";
        
        //Check model name
        if(model != null && model != "" && model != " " && model != undefined){
            var file_model = fs.readdirSync('./model');
            //Ini untuk mencari file model
            var no_file = true;
            //For UpperCase to Lowercase
            var name_file = model.toLowerCase().split(' ').join('_');
            var result_file_model = "";
            //For search file
            file_model.forEach(element => {
                element_backup = element;
                element = element.toLowerCase();
                var get = element.includes(name_file);
                if(get == true){
                    result_file_model = element_backup;
                }
            });

        //-----------------------------------------RULES CREATE-------------------------------------------------//
        var rules_create = require('../../../model/'+result_file_model).rulesOnCreate;
        //Get field in rules
        var key_rules_create = Object.keys(rules_create);
        function_insert = "\tmain.insert({\n\t'models' : ['"+model+"'],\n\t'field' : [";
        // function_insert = function_insert+key_rules_create;

        // For generate field
        key_rules_create.forEach(function(element,index){
            function_insert = function_insert +"'"+element+"'";
            if(key_rules_create[index+1] != undefined){
                function_insert = function_insert + ",";
            }
        });
        function_insert = function_insert + "],\n\t'result' : [";

        // For generate result
        key_rules_create.forEach(function(element,index){
            if(index==0){
                function_insert = function_insert +"\n";
            }
            function_insert = function_insert +"\t\treq.body."+element;
            if(key_rules_create[index+1] != undefined){
                function_insert = function_insert + ",\n";
            }
        });
        function_insert = function_insert + "\n\t";
        function_insert = function_insert + "\n\t]\n\t}).then(function (q) {\n\t\t try {\n\t\t\t\n\t\t\t}catch(error){\n\n\t\t}\n\t},function(err){\n\t\t try{\n\n\t\t\t}catch(error){\n\n\t\t} \n\t});";


            //-----------------------------------------RULES READ-------------------------------------------------//
            var rules_read = require('../../../model/'+result_file_model);
            //Get field in rules
            var key_rules_read = Object.keys(rules_read);
            function_read = "\tmain.read({\n\t'models' : ['"+model+"'],\n\t'select' : [";
            // function_insert = function_insert+key_rules_create;

            // For generate field
            function_read = function_read +"'"+'*'+"'";
            
            // For generate field 
            
            function_read = function_read + "]\n\t}).then(function (q) {\n\t\t try {\n\t\t\t\n\t\t\t}catch(error){\n\n\t\t}\n\t},function(err){\n\t\t try{\n\t\t\t\n\t\t\t}catch(error){\n\n\t\t} \n\t});";



            // rules_create.forEach(function (element, index){
            //     console.log(element);
            // });
            //----------------------------------------------

            //Ini untuk memproses modelnya 
            //index()
            /*
            main.read({
            "select"        : ['name', 'age'],
            "table_name"    : ['members']
        
            });
            */

    
         //-----------------------------------------RULES UPDATE-------------------------------------------------//
         var rules_update = require('../../../model/'+result_file_model).rulesOnUpdate;
         //Get field in rules
         var key_rules_update = Object.keys(rules_update);
         function_update = "\tmain.update({\n\t'models' : ['"+model+"'],\n\t'set' : [";
         // function_insert = function_insert+key_rules_create;
 
         // For generate field
         key_rules_update.forEach(function(element,index){
            
             function_update = function_update + "\n\t\t[" +"'"+ element + "'," + "'='"+ ",req.body." + element +"]";
             if(key_rules_update[index+1] != undefined){
                 function_update = function_update + ",";
             }
         });
         function_update = function_update + "\n\t],\n\t'where' : [";
 
       
         function_update = function_update + "\n\t\t[" +"'"+  key_rules_update[0] + "'," + "'='"+ ",req.params." +  key_rules_update[0] +"]";
         
         function_update = function_update + "\n\t]\n\t}).then(function (q) {\n\t\t try {\n\t\t\t\n\t\t\t}catch(error){\n\n\t\t}\n\t},function(err){\n\t\t try{\n\n\t\t\t}catch(error){\n\n\t\t} \n\t});";


        // rules_create.forEach(function (element, index){
        //     console.log(element);
        // });
        //----------------------------------------------

        //Ini untuk memproses modelnya 
        //insert()
        /*
            main.insert({
                'models' : ['mahasiswaModel'],
                "field": ['id',' id_prodi_fk', 'Email', 'PASSWORD', 'NIK'],
                "result": [
                    req.body.id,
                    req.body.id_prodi_fk,
                    req.body.Email,
                    req.body.PASSWORD,
                    req.body.NIK
                ]
            });
            function_update = function_update + "\n\t],\n\t'where' : [";
    
        
            function_update = function_update + "\n\t\t[" +"'"+  key_rules_update[0] + "'," + "'='"+ ",req.body." +  key_rules_update[0] +"]";
            
            function_update = function_update + "\n\t]\n}).then(function (q) {\n\t\t try {\n\t\t\t console.log(q); \n\t\t\t console.log(" + "'berhasil update'" + ");\n\t\t }catch(error){\n\n\t\t}\n\t},function(err){\n\t\t try{\n\t\t\tconsole.log(err.action);\n\t\t\t} catch(error){\n\n\t\t} \n\t});";


            // rules_create.forEach(function (element, index){
            //     console.log(element);
            // });
            //----------------------------------------------

            //Ini untuk memproses modelnya 
            //insert()
            /*
                main.insert({
                    'models' : ['mahasiswaModel'],
                    "field": ['id',' id_prodi_fk', 'Email', 'PASSWORD', 'NIK'],
                    "result": [
                        req.body.id,
                        req.body.id_prodi_fk,
                        req.body.Email,
                        req.body.PASSWORD,
                        req.body.NIK
                    ]
                });
            */

    //-----------------------------------------RULES ERASE-------------------------------------------------//
    var rules_erase = require('../../../model/'+result_file_model).rulesOnCreate;
    //Get field in rules
    var key_rules_erase = Object.keys(rules_erase);
    function_erase = "\tmain.erase_query({\n\t'models' : ['"+model+"'],\n\t'where' : [";
    // function_insert = function_insert+key_rules_create;

    // For generate field
        function_erase = function_erase + "\n\t\t[" +"'"+ key_rules_erase[0] + "'," + "'='"+ ",req.params." +  key_rules_erase[0] +"]";
        function_erase = function_erase + "\n\t]\n\t}).then(function (q) {\n\t\t try {\n\t\t\t\n\t\t\t}catch(error){\n\n\t\t}\n\t},function(err){\n\t\t try{\n\t\t\t\n\t\t\t}catch(error){\n\n\t\t} \n\t});";
         
            

    // rules_create.forEach(function (element, index){
    //     console.log(element);
    // });
    //----------------------------------------------

    //Ini untuk memproses modelnya 
    //index()
    /*
    main.read({
    "select"        : ['name', 'age'],
    "table_name"    : ['members'],
    "where"         : ['dhon', '=', '18'],
    "orWhere"       : ['dam', '=', '20']

    });
    */
            model_name = model;
        }
        
        //Change space to underscore and Uppercase to Lowercase or name file
        var name_file = name.split(' ').join('_');

        //For Function Name
        var syntax ="//declare var con from enviroment//\nvar main = require('../core/aurora-crud/aura/sysaura');\n\n";
        syntax = syntax+"function index(req, res) {\n"+function_read+"\n}\n\n";
        syntax = syntax+"function create(req, res) {\n"+function_insert+"\n}\n\n";
        syntax = syntax+"function update(req, res) {\n"+function_update+"\n}\n\n";
        syntax = syntax+"function erase(req, res) {\n"+function_erase+"\n}\n\n\n";
        syntax = syntax+"module.exports.index = index;\n";
        syntax = syntax+"module.exports.create = create;\n";
        syntax = syntax+"module.exports.update = update;\n";
        syntax = syntax+"module.exports.erase = erase;\n";
        //Create file to ./model/
        fs.appendFile('./controllers/'+name_file+'.js', syntax, function (err) {
            if (err) {
                return reject(err);
            };

            //Return command successfully
            console.log('File Controller '+name+'.js'+' is created successfully.');
            return resolve();
        });
   });
}

//Function for generate
function generate(command,name,table){
    return new Promise(function (resolve,reject){
        switch (command) {
            case 'RUN':
                var nameController = name+"Controller";
                var nameModel = name+"Model";

                //For generate model
                create_file_model(nameModel,table,true).then(function(){
                    //For generate controller
                    create_crud_file(nameController,nameModel).then(function(){
                            generate_route(nameController,name.toLowerCase(),nameModel).then(function(){
                                resolve();
                            },function(err){
                                reject(err);
                            });
                        },function(err){
                            reject(err);
                        });
                },function(err){
                      reject(err);
                });
    
                break;
        
            default:
                break;
        }
    });
}

//for generate routes 
function generate_route(name,route,model){
    return new Promise(function (resolve,reject){
        var get_field = require('../../../model/'+model).rulesOnCreate;
        //Get field in rules
        var obj_get_field = Object.keys(get_field);
        
        //read file
        fs.readFile('./route/api.js', 'utf8', function (err, data) {

            var syntax_route = data.replace('app.listen(port);', '').replace("console.log('Aurora Serve on port ' + port);", '');
            
            //For index syntax
            syntax_route = syntax_route+"app.get('/"+route+"', function(req, res) {\n\trequire('../controllers/"+name+"').index(req,res);\n});";

            //For create syntax
            syntax_route = syntax_route+"\n\napp.post('/create/"+route+"', function(req, res) {\n\tres.send(require('../controllers/"+name+"').create(req,res));\n});";

            //For update syntax
            syntax_route = syntax_route+"\n\napp.post('/edit/"+route+"/:"+obj_get_field[0]+"', function(req, res) {\n\tres.send(require('../controllers/"+name+"').update(req,res));\n});";

            //For delete syntax
            syntax_route = syntax_route+"\n\napp.post('/delete/"+route+"/:"+obj_get_field[0]+"', function(req, res) {\n\tres.send(require('../controllers/"+name+"').erase(req,res));\n});";

            //For add listen
            syntax_route = syntax_route+"\n\napp.listen(port);";

            //For add magic
            syntax_route = syntax_route+"\n\nconsole.log('Aurora Serve on port ' + port);";
            
            fs.writeFile('./route/api.js', syntax_route, function (err) {
                if (err) {
                    return reject(err);
                };
                console.log('Route updated successfully.');
                return resolve();
            });
        });
    });
}
module.exports.create_model = create_file_model;
module.exports.create_crud = create_crud_file;
module.exports.generate = generate;
