var fs = require("fs");
var compile = require('../../compile.js');
var response_rules = null;

//function for create model file 
function create_file_model(name,table,generate){
    var rules = null;

    if(generate != null && generate != "" && generate != " " && generate != undefined && generate == true){
            return generate_rules(table).then(function(data){
                create_file(table,name,response_rules);
            });     
    }else{
        return create_file(table,name);
    }

}

//function for create crud file 
function create_crud_file(name,model,generate){
    var rules = null;

    if(generate != null && generate != "" && generate != " " && generate != undefined && generate == true){
            
                create_file(model,name,response_rules);
               
    }else{
        return create_file(model,name);
    }

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
        if (err) throw err;

        //Return command successfully
        console.log('File Model '+name+'.js'+' is created successfully.');
        return process.exit();
    });
}


//Function for run create table 
function create_crud_file(model,name,rules){
    var model_name = "";

    //Check model name
    if(model != null && model != "" && model != " " && model != undefined){
        model_name = model;
    }
    
    //Change space to underscore and Uppercase to Lowercase or name file
    var name_file = name.split(' ').join('_');

    //For table name
    var syntax = "module.exports.model_name = \""+model_name+"\";\n\n";
    
    //If not with generate rules
    if(rules == null){
        //For rulesOnCreate
        syntax = syntax + "module.exports.create = {\n\n};\n\n";

        //For rulesOnUpdate
        syntax = syntax + "module.exports.update = {\n\n};\n\n";
    }else{
        //For rulesOnCreate if have rules
        syntax = syntax + "module.exports.erase = "+rules+"\n\n";

        //For rulesOnUpdate if have rules
        syntax = syntax + "module.exports.index = "+rules+"\n\n";
    }

    //Create file to ./model/
    fs.appendFile('./controllers/'+name_file+'.js', syntax, function (err) {
        if (err) throw err;

        //Return command successfully
        console.log('File Model '+name_file+'.js'+' is created successfully.');
        return process.exit();
    });
}
module.exports.create_model = create_file_model;
module.exports.create_crud = create_crud_file;