var connection = require('./connection');
var serve = require('./serve');
var name_file_config = '';

/*
Run main for check name file
*/
function main(name_config){
    var response_check = check_config(name_config);
    if(response_check.action == true){
        return connection.connect(require(response_check.data));
    }
    console.log(response_check.data);
    return process.exit();
}


/*
Check name config and file config
Retrun true or false with response 
*/
function check_config(name_config){
    //get name config
    if(name_config == null || name_config == 'main'){
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
module.exports.main = main;