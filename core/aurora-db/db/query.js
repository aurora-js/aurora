aurora = require('../../compile');
//db type
var db_type = "";
function db_type(){
    db_type = aurora.enviroment();
}

//Function for type run query 
function run_query(type,table,field){
    db_type();

    switch (type) {
        case 'create':
            function create_query(db_type,table,field);
            break;
    
        default:
            break;
    }
}