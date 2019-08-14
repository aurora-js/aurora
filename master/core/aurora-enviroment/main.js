var connection = require('./connection');
var serve = require('./serve');
var name_file_config = '';

/*
Run main for check name file
*/
function main(name_config){
    var response_check = check_config(name_config);
    //if no error
    if(response_check.action == true){
        return connection.connect(require(response_check.data));
    }
    //if error
    console.log(response_check.data);
    return process.exit();
}

/*
Run main for check name file and remove db type default and change to custom db
*/
function main_without_db(name_config,custom_db){
    var response_check = check_config(name_config);
    //if no error
    if(response_check.action == true){
        var data_config  = require(response_check.data);
        //change default db type to custom db type
        data_config.config.db_type = custom_db;
        return connection.connect(data_config);
    }
    //if error
    console.log(response_check.data);
    return process.exit();
}


/*
Check name config and file config
Retrun true or false with response 
*/
function check_config(name_config){
    //get name config
    if(name_config == null || name_config == 'main' || (name_config.includes(".") || name_config.includes(":") || name_config.includes("/"))){
        name_file_config = '../../config';
    }else{
        name_file_config = '../../'+name_config+'.config.js'; 
    }

    //check file config
    try {
        require(name_file_config);
        return {data : name_file_config, action : true};
    } catch (error) {
        return {data : 'ERROR!\n'+name_config+' config not found \nPlease make sure you have '+name_file_config+' or not', action : false};
    }
}

//Function get value config user 
function get_config(name_config){
    var response_check = check_config(name_config);
    //if no error
    if(response_check.action == true){
        var data_config  = require(response_check.data);
        return data_config;
    }
    //if error
    console.log(response_check.data);
    return process.exit();
}

module.exports.main = main;
module.exports.main_without_db = main_without_db;
module.exports.get_config = get_config;