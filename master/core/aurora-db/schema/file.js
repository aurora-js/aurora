var fs = require("fs");

//function 
function create_file_schema(name){
    //GET Date Now
    var d = new Date();

    //Change space to underscore and Uppercase to Lowercase or name file
    var name_file = name.toLowerCase().split(' ').join('_');

    //Make date file name
    var date_file = d.getDate().toString()+d.getMonth().toString()+d.getFullYear().toString()+d.getHours().toString()+d.getMinutes().toString()+d.getMinutes().toString()+d.getSeconds().toString();

    //For create module
    var syntax = "module.exports.create = { \n\t'table_name' : '"+name+"', \n\t'engine' : 'innoDB', \n\t'blueprint' : function(){\n\n\t}\n};\n\n";
    
    //For update module
    syntax = syntax + "module.exports.update = {\n\t'blueprint' : function(){\n\n\t}\n};\n\n";

    //For delete module
    syntax = syntax + "module.exports.delete = {\n\t'blueprint' : function(){\n\t\tdropIfExistsTable('"+name+"');\n\t}\n};\n";

    //Create file to ./database/schema
    fs.appendFile('./database/schema/'+date_file+'_'+name_file+'.js', syntax, function (err) {
        if (err){
            return console.log(err);
        }

        //Return command successfully
        return console.log('File '+date_file+'_'+name_file+'.js'+' is created successfully.');
    });
}

//Create file schmea with generate
function create_file_schema_generate(table_name,column,relation){
    return new Promise(function(resolve,reject){
        //GET Date Now
        var d = new Date();

        //Change space to underscore and Uppercase to Lowercase or name file
        var name_file = table_name.toLowerCase().split(' ').join('_');

        //Make date file name
        var date_file = d.getDate().toString()+d.getMonth().toString()+d.getFullYear().toString()+d.getHours().toString()+d.getMinutes().toString()+d.getMinutes().toString()+d.getSeconds().toString();

        //Create column and attribute 
        var syntax_column = "";
        column.forEach(element => {
            syntax_column = syntax_column+"\t\t"+element.type+"(\'"+element.name+"\'";
            if(element.length != null){
                syntax_column = syntax_column+","+element.length;
            }

            syntax_column = syntax_column+")";
            
            if(element.primary_key == true){
                syntax_column = syntax_column+",primary()";
            }
            if(element.unique == true){
                syntax_column = syntax_column+",unique()";
            }
            if(element.nullable == true){
                syntax_column = syntax_column+",nullable()";
            }

            syntax_column = syntax_column+";\n";
        });

        //For create syntax generate relation
        if(relation.column_foreign_key != null){
            syntax_column = syntax_column+"\t\tforeign(\'"+relation.column_foreign_key+"\'),references(\'"+relation.table_references+"\',\'"+relation.column_references+"\'),onDelete(\'"+relation.on_delete+"\'),onUpdate(\'"+relation.on_update+"\');\n";
        }

        //For create module
        var syntax = "module.exports.create = { \n\t'table_name' : '"+table_name+"', \n\t'engine' : 'innoDB', \n\t'blueprint' : function(){\n"+syntax_column+"\n\t}\n};\n\n";
        
        //For update module
        syntax = syntax + "module.exports.update = {\n\t'blueprint' : function(){\n\n\t}\n};\n\n";

        //For delete module
        syntax = syntax + "module.exports.delete = {\n\t'blueprint' : function(){\n\t\tdropIfExistsTable('"+table_name+"');\n\t}\n};\n";

        //Create file to ./database/schema
        fs.appendFile('./database/schema/'+date_file+'_'+name_file+'.js', syntax, function (err) {
            if (err){
                reject(err);
            }

            //Return command successfully
            console.log('File '+date_file+'_'+name_file+'.js'+' is created successfully.');
            resolve(name_file);
        });
    });
    
}

module.exports.create_file_schema = create_file_schema;
module.exports.create_file_schema_generate = create_file_schema_generate;