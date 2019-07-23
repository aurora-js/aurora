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
    syntax = syntax + "module.exports.delete = {\n\t'blueprint' : function(){\n\n\t}\n};\n";

    //Create file to ./database/schema
    fs.appendFile('./database/schema/'+date_file+'_'+name_file+'.js', syntax, function (err) {
        if (err) throw err;

        //Return command successfully
        return console.log('File '+date_file+'_'+name+'.js'+' is created successfully.');
    });
}

module.exports.create_file_schema = create_file_schema;