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
    default : null,
    comment : null,
    useCurrent : false,
    unique : false,
    index : false,
    column_index : null,
    primary : false,
    references_table : null,
    references_id : null,
    ondelete : null,
    onupdate : null
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
    files.forEach(function(element,keys) {
        //Reset Field 
        field_arr = [];

        var schemafile = require('../../../database/schema/'+element);
        
        var json = JSON.stringify(schemafile.up.blueprint, function(key, value) {
            if (typeof value === "function") {
            return "/Function(" + value.toString() + ")/";
            }
            return value;
        });
        
        var obj2 = JSON.parse(json, function(key, value) {
            if (typeof value === "string" &&
                value.startsWith("/Function(") &&
                value.endsWith(")/")) {
            value = value.substring(10, value.length - 2);
            return eval("(" + value + ")");
            }
            return value;
        });
        
        //For run function in json
        obj2();

        //Check last file
        var last = false;
        if(keys == files.length-1) {
            last = true;
        }
        //Run create to file query
        require('../query/'+type_database).create_table(schemafile.up.table_name,schemafile.up.engine,field_arr,last);



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
    add_value('type', 'INT', false);
    add_value('notNull', true, false);
    add_value('autoIncrement', true, false);
    add_value('primary', true, false);
}

function varchar(val,leng){
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'VARCHAR', false);
}

function nullable(){
    add_value('notNull', true, false);
}

function unique(){
    add_value('unique', true, false);
}

function index(arr){
    add_value('type', 'INDEX', true);
    add_value('column_index', arr, false);
}

function integer(val,leng){
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'INT', false);
}

function smallInteger(val,leng){
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'SMALLINT', false);
}

function mediumInteger(val,leng){
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'MEDIUMINT', false);
}

function bigInteger(val,leng){
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'BIGINT', false);
}


function foreign(val){
    add_value('name', val, true);
    add_value('type', 'FOREIGN', false);
}

function references(table,id){
    add_value('references_table', table, false);
    add_value('references_id', id, false);
}

function onDelete(val){
    add_value('ondelete', val, false);
}

function onUpdate(val){
    add_value('onupdate', val, false);
}




// function unsigned(){
//     add_value('unsigned', true, false);
// }

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
            autoIncrement: false,
            default : null,
            comment : null,
            useCurrent : false,
            unique : false,
            index : false,
            column_index : null,
            primary : false,
            references_table : null,
            references_id : null,
            ondelete : null,
            onupdate : null
            
        };

    //If not add row to array field_arr
    }else{
        field_arr[leng_arr-1][field] = val;
    }

}


module.exports.run = run;