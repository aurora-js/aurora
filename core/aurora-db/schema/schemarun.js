const fs = require('fs')
const exec = require('child_process').exec
const async = require('async');

//Folder file schema
const schema_folder = './database/schema/';

//Name file from foreach in folder ./database/schema 
const files = fs.readdirSync(schema_folder); // reading files from folders

//Main variable
var table_name = null;
var field_arr = [];
var default_field = {
    name : null,
    type: null,
    unsigned: false, 
    notNull: false,
    length: null,
    autoIncrement: false,
};
var type_database = null;

function check_db_type(type){
    switch (type) {
        case 'mysql':
                type_database = 'mysql';
            break;
    
        default:
            break;
    }
}

//Function for run schema 
function run(type){
    check_db_type(type);
    type_database = type;

    //Foreach file to get up value
    files.forEach(element => {
        var schemafile = require('../../../database/schema/'+element);
        
        //var json = eval(schemafile.up.blueprint);
        // Convert to JSON using a replacer function to output
        // the string version of a function with /Function(
        // in front and )/ at the end.
        var json = JSON.stringify(schemafile.up.blueprint, function(key, value) {
            if (typeof value === "function") {
            return "/Function(" + value.toString() + ")/";
            }
            return value;
        });
        
        // Convert to an object using a reviver function that
        // recognizes the /Function(...)/ value and converts it
        // into a function via -shudder- `eval`.
        var obj2 = JSON.parse(json, function(key, value) {
            if (typeof value === "string" &&
                value.startsWith("/Function(") &&
                value.endsWith(")/")) {
            value = value.substring(10, value.length - 2);
            return eval("(" + value + ")");
            }
            return value;
        });
        obj2();

        //Run create to file query
        require('../query/'+type_database).create_table(schemafile.up.table_name,field_arr);
    });
    
    

    //console.log(files);
}

/*Function for create increment field
    Add value have parameter :
        1. Name Field
        2. Type
        3. True/False add row in field_arr
*/
function increment(val){
    add_value('name', val, true);
    add_value('type', 'integer', false);
    add_value('autoIncrement', true, false);
}
function varchar(val,leng){
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'varchar', false);
}
function nullable(){
    add_value('notNull', true, false);
}

//Check length array
function check_length(){
    return field_arr.length;
}

//Function for add value to array field_arr
function add_value(field, val, newrow){
    var leng_arr = check_length();
    // var field_type = null;

    //If add row to array field_arr
    if(newrow==true){
        default_field[field] = val;
        field_arr.push(default_field);
        default_field = {
            name : null,
            type: null,
            unsigned: false, 
            notNull: false,
            length: null,
        };

    //If not add row to array field_arr
    }else{
        field_arr[leng_arr-1][field] = val;
    }

}


module.exports.run = run;