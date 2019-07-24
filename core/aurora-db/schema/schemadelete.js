const fs = require('fs')
const exec = require('child_process').exec
const async = require('async');

//Folder file schema
const schema_folder = './database/schema/';

//Name file from foreach in folder ./database/schema 
var files = fs.readdirSync(schema_folder); // reading files from folders

//Main variable
var table_name = null;
var field_arr = [];
var default_field = {
    drop_column : false,
    drop_column_from : null,
    drop_foreign : false,
    drop_foreign_from : null,
    drop_index : false,
    drop_index_from : null,
    drop_unique : false,
    drop_unique_from : null,
    drop_primary : false,
    drop_primary_from : null,
    drop_table : false,
    drop_table_if_exists : false,
    drop_table_from : null,
};
var type_database = null;

function check_db_type(type) {
    switch (type) {
        case 'mysql':
            type_database = 'mysql';
            break;

        default:
            break;
    }
}

/*
@param exitsuccess for check if success run process.exit() or not
*/
//Function for run schema 
function run(type,exitsuccess,schema) {
    
    check_db_type(type);
    type_database = type;
    
    //Check Run Schema In Certain File Or Not 
    if(schema != null){
        /*
            ! Important !
            Name file can not use '.js',
            but if user have schema like :
            1. 2019......_person_one.js
            2. 2019......_person_two.js
            user must use '.js', example user want run schema person_one, user must run command :
            aurora db:run -s person_one or person_one.js
        */
        var no_file = true;
        //For UpperCase to Lowercase
        var name_file = schema.toLowerCase().split(' ').join('_');

        //For search file
        files.forEach(element => {
            var get = element.includes(name_file);
            if(get == true){
                files = [];
                files.push(element);
                no_file = false;
            }
        });

        //If no file
        if(no_file == true){
            return console.log('Schema '+name_file+' Not Found');
        }
    }

    //Foreach file to get up value
    files.forEach(function (element, keys) {
        //Reset Field 
        field_arr = [];

        var schemafile = require('../../../database/schema/' + element);

        var json = JSON.stringify(schemafile.delete.blueprint, function (key, value) {
            if (typeof value === "function") {
                return "/Function(" + value.toString() + ")/";
            }
            return value;
        });

        var obj2 = JSON.parse(json, function (key, value) {
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
        if (keys == files.length - 1) {
            last = true;
        }
        //Run create to file query
        return require('../query/'+type_database).delete_table(schemafile.create.table_name,field_arr,last,exitsuccess);



    });



    //console.log(files);
}

/*
@param exitsuccess for check if success run process.exit() or not
*/
//Function for delete table
function delete_table(type,exitsuccess,schema) {
    check_db_type(type);
    type_database = type;
    
    //Check Run Schema In Certain File Or Not 
    if(schema != null){
        /*
            ! Important !
            Name file can not use '.js',
            but if user have schema like :
            1. 2019......_person_one.js
            2. 2019......_person_two.js
            user must use '.js', example user want run schema person_one, user must run command :
            aurora db:run -s person_one or person_one.js
        */
        var no_file = true;
        //For UpperCase to Lowercase
        var name_file = schema.toLowerCase().split(' ').join('_');

        //For search file
        files.forEach(element => {
            var get = element.includes(name_file);
            if(get == true){
                files = [];
                files.push(element);
                no_file = false;
            }
        });

        //If no file
        if(no_file == true){
            return console.log('Schema '+name_file+' Not Found');
        }
    }

    //Foreach file to get up value
    files.forEach(function (element, keys) {
        //Reset Field 
        field_arr = [];

        var schemafile = require('../../../database/schema/' + element);
        //For add comman delete
        dropIfExistsTable(schemafile.create.table_name); 

        //Check last file
        var last = false;
        if (keys == files.length - 1) {
            last = true;
        }
        //Run create to file query
        return require('../query/'+type_database).delete_table(schemafile.create.table_name,field_arr,last,exitsuccess);

    });



    //console.log(files);
}

/* Function main for delete */
function dropColumn(val){
    add_value('drop_column',true, true);
    add_value('drop_column_from', val, false);  
}

function dropForeign(val){
    add_value('drop_foreign',true, true);
    add_value('drop_foreign_from', val, false);  
}

function dropIndex(val){
    add_value('drop_index',true, true);
    add_value('drop_index_from', val, false);  
}

function dropUnique(val){
    add_value('drop_unique',true, true);
    add_value('drop_unique_from', val, false);  
}

function dropPrimary(val){
    add_value('drop_primary',true, true);
    // add_value('drop_primary_from', val, false);  
}

function dropTable(val){
    add_value('drop_table',true, true);
    add_value('drop_table_from', val, false);  
}

function dropIfExistsTable(val){
    add_value('drop_table_if_exists',true, true);
    add_value('drop_table_from', val, false);  
}


// function unsigned(){
//     add_value('unsigned', true, false);
// }

//Check length array
function check_length() {
    return field_arr.length;
}

//Function for add value to array field_arr
function add_value(field, val, newrow) {
    var leng_arr = check_length();
    // var field_type = null;

    //If add row to array field_arr
    if (newrow == true) {
        default_field[field] = val;
        field_arr.push(default_field);
        default_field = {
            drop_column : false,
            drop_column_from : null,
            drop_foreign : false,
            drop_foreign_from : null,
            drop_index : false,
            drop_index_from : null,
            drop_unique : false,
            drop_unique_from : null,
            drop_primary : false,
            drop_primary_from : null,
            drop_table : false,
            drop_table_if_exists : false,
            drop_table_from : null,
        };

        //If not add row to array field_arr
    } else {
        field_arr[leng_arr - 1][field] = val;
    }

}


module.exports.run = run;
module.exports.delete_table = delete_table;