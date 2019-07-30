var filename = "../../../model/";
var file = null;
var responseError = [];
var table = null;

/*
? Info ?
@param name => name model
@param condition => create or update
@param value => value field from user
*/
function main(name,condition,value){
    
    //Run get model
    var get = get_model(name);
    
    //If no error to get model file
    if(get.action == true){
        //Return just table name if not have condition
        if(condition == undefined || condition == null || condition == ""){
            return {action : true, table_name : table};
        }

        //to lower case condition 
        condition = condition.toLowerCase();
        //For Check Rules 
        return rules(condition,value);
    }else{
        return {action : false};
    }

}

//Function for get file models
function get_model(name){
    try {
        //Require file model from name file model user
        file = require(filename+name);
        table = file.table_name;
        return {action : true};
    } catch (error) {
        //Return error if model not found
        console.log('ERROR!\nmodel '+name+' not found \nPlease make sure you have model '+name+' or not');
        return {action : false};
    }
}

//For check rules in models
function rules(condition,value){
    //Variable for get rules
    var rules = [];

    switch (condition) {
        case 'create':
            //Get rules create on models
            rules = file.rulesOnCreate;
            break;
        case 'update':
            //Get rules update on models
            rules = file.rulesOnUpdate;
            break;
        default:
            null;
            break;
    }

    //Get field in rules
    var field_rules = Object.keys(rules);

    //Check validation rules and values
    field_rules.forEach(element => {
        //Split comma in rules value
        var get_rules_field = rules[element].split(',');
        //Check values have same field with rules or not 
        if(value[element] != undefined){
            //For run function check attribute 
            /*
            ? INFO ?
            @param element => name field
            @param get_rules_field => rules field
            @param value[element] => value in field from input user
            @param value => all value in field from input user
            */
            check_attribute(element, get_rules_field, value[element], value);
        }else{
            //If no field and rules required
            if(get_rules_field.includes('required') || get_rules_field.includes(' required')){
                required_attr(element, null, []);
            }
        }
    });


    //Final response
    if(responseError.length == 0){
        return {action : true, table_name : table};
    }
    return {action : false, response : responseError};
}

//Funtion for add error with field and message
function add_error_message(field,message){
    return responseError.push({
        field : field,
        message : message
    });
}

//Function for check attribute rules
function check_attribute(field, rules, value, all_value){
    rules.forEach(element => {
        switch (element) {
            case 'required':
            case ' required':
                //Run attr check reuired value
                required_attr(field,value,rules);
                break;
            case 'string':
            case ' string':
                //Run attr check stringvalue
                string_attr(field,value,rules);
                break;
            case 'number':
            case ' number':
                //Run attr check number value
                number_attr(field,value,rules);
                break;
            case 'boolean':
            case ' boolean':
                //Run attr check boolean value
                boolean_attr(field,value,rules);
                break;
            case 'array':
            case ' array':
                //Run attr check array value
                array_attr(field,value,rules);
                break;
            case 'email':
            case ' email':
                //Run attr check email value
                email_attr(field,value,rules);
                break;
            case 'password_confirmation':
            case ' password_confirmation':
                //Run attr check password confirmation value
                password_confirmation_attr(field,value,rules,all_value);
                break;
            default:
                break;
        }

        if(element.includes('min') || element.includes(' min')){
            //Run attr check min value
            min_attr(field,value,rules,element);
        }
        else if(element.includes('max') || element.includes(' max')){
            //Run attr check max value
            max_attr(field,value,rules,element);
        }
    });
}

//!---------------------------------------------- Attribute Rules --------------------------------------!
//Check field have value or not
function required_attr(field,value,rules){
    if(value == null || value == "" || value == " "){
        var info = field+" is required";
        var check_custom_message = (rules.filter(item => item.indexOf('message_required') > -1));

        //Check if have custom message
        if(check_custom_message.length >0){
            var get_message = check_custom_message[0].split('=>');
            var info = get_message[1];
        }

        return add_error_message(field,info);
    }
    
}

//Check field string value or not
function string_attr(field,value,rules){
    if(typeof value != "string"){
        var info = field+" must be string";
        var check_custom_message = (rules.filter(item => item.indexOf('message_string') > -1));

        //Check if have custom message
        if(check_custom_message.length >0){
            var get_message = check_custom_message[0].split('=>');
            var info = get_message[1];
        }
        return add_error_message(field,info);
    }
}

//Check field number value or not
function number_attr(field,value,rules){
    if(typeof value != "number"){
        var info = field+" must be number";
        var check_custom_message = (rules.filter(item => item.indexOf('message_number') > -1));

        //Check if have custom message
        if(check_custom_message.length >0){
            var get_message = check_custom_message[0].split('=>');
            var info = get_message[1];
        }
        return add_error_message(field,info);
    }
}

//Check field boolean value or not
function boolean_attr(field,value,rules){
    if(typeof value != "boolean"){
        var info = field+" must be boolean";
        var check_custom_message = (rules.filter(item => item.indexOf('message_boolean') > -1));

        //Check if have custom message
        if(check_custom_message.length >0){
            var get_message = check_custom_message[0].split('=>');
            var info = get_message[1];
        }
        return add_error_message(field,info);
    }
}

//Check field array value or not
function array_attr(field,value,rules){
    if(value.constructor != Array){
        var info = field+" must be array";
        var check_custom_message = (rules.filter(item => item.indexOf('message_array') > -1));

        //Check if have custom message
        if(check_custom_message.length >0){
            var get_message = check_custom_message[0].split('=>');
            var info = get_message[1];
        }
        return add_error_message(field,info);
    }
}

//Check field email value or not
function email_attr(field,value,rules){
    //Rules email
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(reg.test(value) == false){
        var info = field+" must be email";
        var check_custom_message = (rules.filter(item => item.indexOf('message_email') > -1));

        //Check if have custom message
        if(check_custom_message.length >0){
            var get_message = check_custom_message[0].split('=>');
            var info = get_message[1];
        }
        return add_error_message(field,info);
    }
}

//Check field password_confirmation value or not
function password_confirmation_attr(field,value,rules,all_value){
    //Get password_confirmation field 
    if(all_value['password_confirmation'] == undefined){
        var info = "Password confirmation is required";
        return add_error_message(field,info);
    }else{
        if(value != all_value['password_confirmation'] ){
            var info = "Set password and confirm password must match";
            var check_custom_message = (rules.filter(item => item.indexOf('message_password_confirmation') > -1));

            //Check if have custom message
            if(check_custom_message.length >0){
                var get_message = check_custom_message[0].split('=>');
                var info = get_message[1];
            }
            return add_error_message(field,info);
        }
    }
    
}

//Check field min value 
function min_attr(field,value,rules,value_element){
    var get_value_min = value_element.split('=>');

    //Clear space
    var value_min = parseInt(get_value_min[1].trim());

    var value_lenght = 0;

    //Check length value
    if(typeof value == "string"){
        value_lenght = value.length;
    }else if(typeof value == "number"){
        value_lenght = value.toString().length;
    }else if(value.constructor == Array){
        value_lenght = value.length;
    }

    if(value_lenght < value_min){
        var info = field+" must have a length minimum that is "+value_min;
        var check_custom_message = (rules.filter(item => item.indexOf('message_min') > -1));

        //Check if have custom message
        if(check_custom_message.length >0){
            var get_message = check_custom_message[0].split('=>');
            var info = get_message[1];
        }
        return add_error_message(field,info);
    }
}

//Check field max value 
function max_attr(field,value,rules,value_element){
    var get_value_max = value_element.split('=>');

    //Clear space
    var value_max = parseInt(get_value_max[1].trim());

    var value_lenght = 0;

    //Check length value
    if(typeof value == "string"){
        value_lenght = value.length;
    }else if(typeof value == "number"){
        value_lenght = value.toString().length;
    }else if(value.constructor == Array){
        value_lenght = value.length;
    }

    if(value_lenght > value_max){
        var info = field+" must have a length maximum that is "+value_max;
        var check_custom_message = (rules.filter(item => item.indexOf('message_max') > -1));

        //Check if have custom message
        if(check_custom_message.length >0){
            var get_message = check_custom_message[0].split('=>');
            var info = get_message[1];
        }
        return add_error_message(field,info);
    }
}

module.exports.main = main;

