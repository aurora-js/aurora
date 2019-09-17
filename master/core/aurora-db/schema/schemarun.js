const fs = require('fs')
const exec = require('child_process').exec
const async = require('async');
//Thank You For Lodash
var _ = require('lodash');
//Folder file schema
const schema_folder = './database/schema/';

//Name file from foreach in folder ./database/schema 
try {
    var files = fs.readdirSync(schema_folder); // reading files from folders
    //Remove .keep files
    var files = files.filter(function(value, index, arr){

        return value != ".keep";
    
    });
} catch (error) {
    
}

//Main variable
var table_name = null;
var field_arr = [];
var default_field = {
    name: null,
    type: null,
    unsigned: false,
    notNull: false,
    length: null,
    autoIncrement: false,
    default: null,
    default_value: null,
    comment: null,
    useCurrent: false,
    unique: false,
    index: false,
    column_index: null,
    primary: false,
    references_table: null,
    references_id: null,
    ondelete: null,
    onupdate: null
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
    return new Promise(function(resolve,reject){
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

        //Check File 
        if(files.length == 0){
            console.log('Nothing to migrate');
            process.exit();
        }
        //Foreach file to get up value
        files.forEach(function (element, keys) {
            //Reset Field 
            field_arr = [];

            var schemafile = require('../../../database/schema/' + element);

            var json = JSON.stringify(schemafile.create.blueprint, function (key, value) {
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
            return require('../query/'+type_database).create_table(schemafile.create.table_name,schemafile.create.engine,field_arr,last,exitsuccess).then(function(){
                if(keys == files.length - 1){
                    resolve();
                }     
            },function(err){
                reject(err);
            });
        });

    });

    //console.log(files);
}

/*Function for create increment field
    Add value have parameter :
        1. Name Field
        2. Type
        3. True/False add row in field_arr
*/
function increment(val) {
    add_value('name', val, true);
    add_value('type', 'INT', false);
    add_value('notNull', true, false);
    add_value('autoIncrement', true, false);
    add_value('primary', true, false);
}

function primary(val) {
    add_value('primary', true, false);
}

function varchar(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'VARCHAR', false);
}

function nullable() {
    add_value('notNull', true, false);
}

function unique() {
    add_value('unique', true, false);
}

function index(arr) {
    add_value('type', 'INDEX', true);
    add_value('column_index', arr, false);
}

function integer(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'INT', false);
}

function smallInteger(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'SMALLINT', false);
}

function mediumInteger(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'MEDIUMINT', false);
}

function bigInteger(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'BIGINT', false);
}


function foreign(val) {
    add_value('name', val, true);
    add_value('type', 'FOREIGN', false);
}

function references(table, id) {
    add_value('references_table', table, false);
    add_value('references_id', id, false);
}

function onDelete(val) {
    add_value('ondelete', val, false);
}

function onUpdate(val) {
    add_value('onupdate', val, false);
}

function decimal(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'DECIMAL', false);
}

//DHONI
function float(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'FLOAT', false);
}

function double(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'DOUBLE', false);
}

function real(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'REAL', false);
}

function bit(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'BIT', false);
}

function boolean(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'BOOLEAN', false);
}

function serial(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'SERIAL', false);
}

//date & time
function date(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'DATE', false);
}

function dateTime(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'DATETIME', false);
}

function timeStamp(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'TIMESTAMP', false);
}

function time(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'TIME', false);
}

function year(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'YEAR', false);
}

//string
function char(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'CHAR', false);
}

function varchar(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'VARCHAR', false);
}

function tinyText(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'TINYTEXT', false);
}

function text(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'TEXT', false);
}

function mediumText(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'MEDIUMTEXT', false);
}

function longText(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'LONGTEXT', false);
}

function binary(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'BINARY', false);
}

function varBinary(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'VARBINARY', false);
}

function tinyBlob(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'TINYBLOB', false);
}

function mediumBlob(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'MEDIUMBLOB', false);
}

function blob(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'BLOB', false);
}

function longBlob(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'LONGBLOB', false);
}

function enums(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'ENUM', false);
}

function set(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'SET', false);
}

function geometry(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'GEOMETRY', false);
}

function point(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'POINT', false);
}

function lineString(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'LINESTRING', false);
}

function polygon(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'POLYGON', false);
}

function multiPoint(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'MULTIPOINT', false);
}

function multiLineString(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'MULTILINESTRING', false);
}

function multiPolygon(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'MULTIPOLYGON', false);
}

function geometryCollection(val, leng) {
    add_value('name', val, true);
    add_value('length', leng || null, false);
    add_value('type', 'GEOMETRYCOLLECTION', false);
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
            name: null,
            type: null,
            unsigned: false,
            notNull: false,
            length: null,
            autoIncrement: false,
            default: null,
            default_value: null,
            comment: null,
            useCurrent: false,
            unique: false,
            index: false,
            column_index: null,
            primary: false,
            references_table: null,
            references_id: null,
            ondelete: null,
            onupdate: null

        };

        //If not add row to array field_arr
    } else {
        field_arr[leng_arr - 1][field] = val;
    }

}


module.exports.run = run;