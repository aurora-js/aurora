var fs = require("fs");

//function 
function create_file_schema(name){
    //GET Date Now
    var d = new Date();

    //Change space to underscore and Uppercase to Lowercase or name file
    var name_file = name.toLowerCase().split(' ').join('_');

    //Make date file name
    var date_file = d.getDate().toString()+d.getMonth().toString()+d.getFullYear().toString()+d.getHours().toString()+d.getMinutes().toString()+d.getMinutes().toString()+d.getSeconds().toString();

    //Format for fill to file module.exports.up
    /*
    TODO :
    1. Add Module Export Update
    2. Add Module Export Drop
    */
    var syntax = "module.exports.create = { \n\t'table_name' : '"+name+"', \n\t'engine' : 'innoDB', \n\t'blueprint' : function(){\n\n\t}\n};";
    
    //Create file to ./database/schema
    fs.appendFile('./database/schema/'+date_file+'_'+name_file+'.js', syntax, function (err) {
        if (err) throw err;

        //Return command successfully
        return console.log('File '+date_file+'_'+name+'.js'+' is created successfully.');
    });
}

module.exports.create_file_schema = create_file_schema;