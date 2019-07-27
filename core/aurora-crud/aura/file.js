var fs = require("fs");

//function 
function create_file_model(name,table){

    var table_name = "\"\"";

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

module.exports.create_model = create_file_model;