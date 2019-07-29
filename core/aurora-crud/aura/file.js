var fs = require("fs");
var compile = require('../../compile.js');

//function for create model file 
function create_file_model(name,table,generate){
    if(generate != null && generate != "" && generate != " " && generate != undefined && generate == true){
        return generate_rules(table);
    }
    var table_name = "";

    //Check table name
    if(table != null && table != "" && table != " " && table != undefined){
        table_name = table;
    }
    
    //Change space to underscore and Uppercase to Lowercase or name file
    var name_file = name.toLowerCase().split(' ').join('_');

    //For table name
    var syntax = "module.exports.table_name = \""+table_name+"\";\n\n";
    
    //For rulesOnCreate
    syntax = syntax + "module.exports.rulesOnCreate = {\n\n};\n\n";

    //For rulesOnUpdate
    syntax = syntax + "module.exports.rulesOnUpdate = {\n\n};\n\n";

    //Create file to ./model/
    fs.appendFile('./model/'+name_file+'.js', syntax, function (err) {
        if (err) throw err;

        //Return command successfully
        return console.log('File Model '+name+'.js'+' is created successfully.');
    });
}

//function for generate value rules from table
function generate_rules(table){
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
                        return generate_rules_data(data);
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
}

function generate_rules_data(data){
    var field = [];
    //Foreach field and check type and nullable field
    if(data.length > 0){
        var generate_rules = "";
        generate_rules = generate_rules + "{\n\t";
        data.forEach(function (element, index){
            field.push(element.Field);
            console.log(field);
            console.log(field['id']);
            var another = false;
            //If have integer add to number rules
            if(element.Type.includes('int')){
                another = true;
                generate_rules = generate_rules + "\n\"" + element.Field + "\" : ";
                generate_rules = generate_rules + "\"number";
            }
        });
        generate_rules = generate_rules + "\n\n};\n";
        // var obj = JSON.parse(generate_rules);
        // console.log(generate_rules);
    }else{
        return null;
    }
}

module.exports.create_model = create_file_model;