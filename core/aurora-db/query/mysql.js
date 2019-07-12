//Get connection enviroment
const compile = require('../../compile');
var con = compile.enviroment;
var query = "";
var table_name = "";
var index_column = [];


//function for create database
function create_db(value) {
    con = compile.aurora_enviroment_without_db('mysqlnodb');
    con.query("CREATE DATABASE " + value, function (err, result) {
        if (err) {
            console.log('WARNING!\nDatabase ' + value + ' not created');
        } else {
            console.log('YEAY!\nDatabase ' + value + ' successfully created');
        }
        return process.exit();
    });
}

//Function create table
function create_table(table, field, last) {
    table_name = table;

    //Open syntax sql to create table
    query = "CREATE TABLE " + table_name + "(";

    //Foreach to function in field to syntax
    field.forEach(function (element, index) {


            //Run check alter for column
            var attribute = check_attribute(element);

            //Get syntax sql
            if(query_field(element) != null){
                query = query + query_field(element);
            }

            //For check next field is create index or relation or unique
            var next_no_comma = "Not Null";
            if(field[index+1]){
                next_no_comma = field[index+1].type;
            }

            //If last field not have ' , '
            if(element.type !=null){
                if (index == field.length - 1 || next_no_comma == null) {
                    if (attribute.action == true) {
                        query = query + attribute.data;
                    }
                } else {
                    if (attribute.action == false) {
                        query = query + ", ";
                    } else {
                        query = query + attribute.data + ", ";
                    }
                }
            }else{

                //Function create index or relation or unique
                check_relation_module(element);
            }
        
    });

    //Close sytax sql
    query = query + " );";

    //function run query from variable query
    run_query('Table', query, 'created', last);

    //check create INDEX
    if(index_column.length>0){
        create_index_column(last);
    }

}


/*---------------------------------------------- GET SYNTAX FOR COLUMNS -------------------------------------*/

//Function for return grammar sytax sql type varchar
function grammar_generate(type, name, length) {
    var grammar = "";
    switch (type) {
        case 'VARCHAR':
            grammar = "VARCHAR";
            break;
        case 'TINYINT':
            grammar = "TINYINT";
            break;
        case 'SMALLINT':
            grammar = "SMALLINT";
            break;
        case 'MEDIUMINT':
            grammar = "MEDIUMINT";
            break;
        case 'INT':
            grammar = "INT";
            break;
        case 'BIGINT':
            grammar = "BIGINT";
            break;
        case 'DECIMAL':
            grammar = "DECIMAL";
            break;
        case 'FLOAT':
            grammar = "FLOAT";
            break;
        case 'DOUBLE':
            grammar = "DOUBLE";
            break;
        case 'REAL':
            grammar = "REAL";
            break;
        case 'BIT':
            grammar = "BIT";
            break;
        case 'BOOLEAN':
            grammar = "BOOLEAN";
            break;
        case 'SERIAL':
            grammar = "SERIAL";
            break;
        default:
            return null;
            break;
    }

    if (length != null) {
        return name + " " + grammar + "(" + length + ")";
    }
    return name + " " + grammar;
}



//Function for add alter
function check_attribute(field) {
    var query_attribute = "";

    if (field.unsigned == true) {
        query_attribute = query_attribute + " UNSIGNED";
    }

    if (field.notNull == true) {
        query_attribute = query_attribute + " NOT NULL";
    }

    if (field.autoIncrement == true) {
        query_attribute = query_attribute + " AUTO_INCREMENT";
    }

    if (field.default != null) {
        query_attribute = query_attribute + " DEFAULT " + field.default;
    }

    if (field.comment != null) {
        query_attribute = query_attribute + " COMMENT " + field.comment;
    }

    if (field.primary == true) {
        query_attribute = query_attribute + " PRIMARY KEY";
    }

    if (field.unique == true) {
        query_attribute = query_attribute + " UNIQUE";
    }

    //If field have alter
    if (query_attribute != null) {
        return {
            action: true,
            data: query_attribute
        }
    }

    return {
        action: false,
        data: null
    }
}

/*--------------------------------------------------------------------------------------------*/


/* ---------------------------------------- CREATE INDEX --------------------------------------*/

//create index column 
function create_index_column(last){
    index_column.forEach(element => {
        var query_index = "CREATE INDEX "+element.name_index+" ON "+table_name+"("+element.column_index+");";

        //set null index_column
        index_column = [];
        run_query('Index', query_index, 'created', last)
    });
    
}

/*
Function for check create unique, index, and foreign key
*/
function check_relation_module(field){

    //For run index
    if (field.index != null) {
        var columns = "";
        field.column_index.forEach(function(element,key){
            if (key == field.column_index.length - 1) {
                columns = columns+element;
            }else{
                columns = columns+element+", ";
            }
        });
        //for add index array
        index_column.push({
            name_index : field.index,
            column_index : columns
        });
    }
}

/*---------------------------------------------------------------------------------------------*/



/* ---------------------------------------- CREATE RELATION --------------------------------------*/



/*---------------------------------------------------------------------------------------------*/


/*-------------------------------------------- QUERY FUNCTION ------------------------------------*/

//Function for function to syntax sql
function query_field(field) {
    var sytax_field = "";
    return sytax_field = grammar_generate(field.type, field.name, field.length);

}


//function for run query
function run_query(type, query, command, last) {
    con = compile.enviroment();
    con.query(query, function (err, result) {
        if (err) {
            console.log('ERROR!\n' + err.sqlMessage);
            return process.exit();
        } else {
            if (last == true && index_column.length == 0) {
                console.log(type +' '+ table_name + ' successfully ' + command);
                return process.exit();
            }
            return console.log(type +' '+ table_name + ' successfully ' + command);
        }
    });
}

/*--------------------------------------------------------------------------------------------*/

module.exports.create_db = create_db;
module.exports.create_table = create_table;