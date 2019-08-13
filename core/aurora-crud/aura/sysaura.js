//get connection function from file compile.js with name aurora_enviroment//
var express = require('../../compile.js');
//get express module//
var express = require('express');
var app = express();
var DB = "";

//declare var con from enviroment//
var enviroment = require('../../compile.js');
var con = enviroment.enviroment();
var aura = require('../query/mysql.js');
var get_config = enviroment.get_config();
var query_read = "";
var query_update = "";

function fetch_json_models(field, value) {
    var json = "{";

    field.forEach(function (element, index) {
        json = json + "\"" + element + "\"" + ":" + "\"" + value[index] + "\"";
        if (value[index + 1] != undefined) {
            json = json + ',';
        }
    });
    json = json + '}';
    return JSON.parse(json);
}

function fetch_json_models_update(field) {
    var json = "{";
   
    field.forEach(function (element, index) {
        json = json + " \"" + element[0] + "\" " + ":" + " \"" + element[2] + "\"";
        if (field[index + 1] != undefined) {
            json = json + " " + ",";
        }
    });
    json = json + '}';
    return JSON.parse(json);
}

//run where query read
function create_attr_read(val) {
    return new Promise(function (resolve, reject) {
        if (val.where != undefined) {
            if (val.where.length > 1) {
                val.where.forEach(function (element, index) {
                    if (index == 0) {
                        query_read = query_read + " WHERE";
                    }
                    query_read = query_read + " " + element[0] + " " + element[1] + " '" + element[2] + "'";
                    if (val.where[index + 1] != undefined) {
                        query_read = query_read + " " + "AND";
                    }
                });

                query_read = query_read;
                console.log(query_read);
            } else {
                query_read = query_read + " WHERE";
                query_read = query_read + " " + val.where[0][0] + " " + val.where[0][1] + " '" + val.where[0][2] + "'";
                console.log(query_read);
            }

            if (val.orWhere) {
                val.orWhere.forEach(function (element, index) {
                    if (index == 0) {
                        query_read = query_read + " OR";
                    }
                    query_read = query_read + " " + element[0] + " " + element[1] + " '" + element[2] + "'";
                    if (val.orWhere[index + 1] != undefined) {
                        query_read = query_read + " " + "OR";
                    }

                });
                query_read = query_read;
                console.log(query_read);
            } else {
                query_read = query_read + " WHERE";
                query_read = query_read + " " + val.where[0][0] + " " + val.where[0][1] + " '" + val.where[0][2] + "'";
                console.log(query_read);
            }
        }



        switch (get_config.config.db_type) {
            //query setting mysql//
            case 'mysql':
                //call query setting in forlder query with file mysql, run function insert_query
                require('../query/mysql').query(query_read, null, function (err, data) {
                    if (err) {
                        // if error
                        reject({
                            action: false
                        });
                    } else {
                        // get data field from table
                        resolve({
                            action: true,
                            data: data
                        });
                    }
                });

                break;

            default:
                break;
        }
    });
}

//run update query
function create_attr_update(val) {
    return new Promise(resolve => {

        if (val.set != undefined) {
            if (val.set.length > 1) {
                val.set.forEach(function (element, index) {
                    if (index == 0) {
                        query_update = query_update + " SET";
                    }
                    query_update = query_update + " " + element[0] + " " + element[1] + " '" + element[2] + "'";
                    if (val.set[index + 1] != undefined) {
                        query_update = query_update + " " + ",";
                    }
                });
                query_update = query_update;
                //console.log(query_update);
            } else {
                query_update = query_update + " SET";
                query_update = query_update + " " + val.set[0][0] + " " + val.set[0][1] + " '" + val.set[0][2] + "'";
                //console.log(query_update);
            }
        }
        if (val.where != undefined) {
            if (val.where.length > 1) {
                val.where.forEach(function (element, index) {
                    if (index == 0) {
                        query_update = query_update + " WHERE";
                    }
                    query_update = query_update + " " + element[0] + " " + element[1] + "'" + element[2] + "'";
                    if (val.where[index + 1] != undefined) {
                        query_update = query_update + " " + "AND";
                    }
                });
                query_update = query_update;
                //console.log(query_update);
            } else {
                query_update = query_update + " WHERE";
                query_update = query_update + " " + val.where[0][0] + " " + val.where[0][1] + "'" + val.where[0][2] + "'";
                //console.log(query_update);
            }
        }

        switch (get_config.config.db_type) {
            //query setting mysql//
            case 'mysql':

                //call query setting in forlder query with file mysql, run function insert_query
                require('../query/mysql').query(query_update, null, function (err, data) {
                    // console.log("test looo");    
                    if (err) {
                        // if error
                        console.log('ERROR!\n', err);
                    } else {
                        // get data field from table
                        resolve(data);
                    }
                });

                break;

            default:
                break;
        }



    });
}

//run erase query
function create_attr_erase(val) {
    return new Promise(function (resolve, reject) {
        if (val.where != undefined) {
            if (val.where.length > 1) {
                val.where.forEach(function (element, index) {
                    if (index == 0) {
                        query_delete = query_delete + " WHERE";
                    }
                    query_delete = query_delete + " " + element[0] + " " + element[1] + " '" + element[2] + "'";
                });

                query_delete = query_delete;
                console.log(query_delete);
            } else {
                query_delete = query_delete + " WHERE";
                query_delete = query_delete + " " + val.where[0][0] + " " + val.where[0][1] + " '" + val.where[0][2] + "'";
                console.log(query_delete);
            }
        }

        switch (get_config.config.db_type) {

            //query setting mysql//
            case 'mysql':
                console.log(query_delete);
                //call query setting in forlder query with file mysql, run function insert_query
                require('../query/mysql').query(query_delete, null, function (err, data) {
                    if (err) {
                        // if error
                        reject({
                            action: false
                        });
                    } else {
                        // get data field from table
                        resolve({
                            action: true,
                            data: data
                        });
                    }
                });

                break;

            default:
                break;
        }

    });
}



//function insert///
function insert(val) {
    return new Promise(function (resolve, reject) {
        var table_name = '';
        if (val.table_name != undefined && val.table_name.length > 0) {
            table_name = val.table_name[0];
        }
        //basic insert//
        // use parameter val as aurora parameter default
        // val can be use in .query setting code
        if (val.models != "" && val.models != undefined) {
            //model validation//
            var json_model = fetch_json_models(val.field, val.result);
            var response_model = enviroment.model(val.models, 'create', json_model);
            if (response_model.action != true) {
                //model validation fail//
                console.log("please make sure check your model validation with your mysql field validation");
                return response_model.response;
            }

            table_name = response_model.table_name;

        }

        //query type validation//
        switch (get_config.config.db_type) {
            //query setting mysql//
            case 'mysql':
                //call query setting in forlder query with file mysql, run function insert_query
                require('../query/mysql').insert_query(table_name, val, function (q) {
                    resolve({
                        action: true,

                    }, q);

                }, function (err) {
                    reject({
                        action: false
                    }, err);

                });
                
                break;

            default:
                break;
        }

    });
}

function update(val) {
    return new Promise(function (resolve, reject) {
        var table_name = "";
        query_update = "";
        
        if (val.table_name != undefined && val.table_name.length > 0) {
            table_name = val.table_name[0];
        }
        if (val.models != "" && val.models != undefined) {
            //model validation//
            var json_model = fetch_json_models_update(val.set);
            var response_model = enviroment.model(val.models, 'update', json_model);
            //console.log(response_model);
            if (response_model.action != true) {
                //model validation fail//
                console.log("please make sure check your model validation with your mysql field validation");
                return response_model.response;
            }

            table_name = response_model.table_name;

        }

        switch (get_config.config.db_type) {
            case 'mysql':

                query_update = query_update + "UPDATE " + table_name;
                
               create_attr_update(val).then(function (q) {
                    resolve({
                        action: true,
                        data: q
                    });

                }, function (err) {
                    reject({
                        action: false
                    }, err);

                });
        };

    });
}

function erase_query(val) {
    return new Promise(function (resolve, reject) {
        var table_name = "";
        query_delete = "";

        if (val.table_name != undefined) {
            table_name = val.table_name[0];
        }


        query_delete = query_delete + "DELETE " + " FROM " + table_name;

        return create_attr_erase(val).then(function (q) {
            resolve(q);
        }, function (err) {
            reject(err);
        });

    });
}
//function read//
function read(val) {
    return new Promise(function (resolve, reject) {
        var select = "*";
        var table_name = "";
        query_read = "";

        switch (get_config.config.db_type) {
            case 'mysql':
                if (val.table_name != undefined) {
                    table_name = val.table_name[0];
                }

                if (val.select != undefined) {
                    select = val.select;
                }

                if (val.models != "" && val.models != undefined) {
                    var response_model = enviroment.model(val.models, null, []);
                    table_name = response.table_name;
                };

                query_read = query_read + "SELECT " + select + " FROM " + table_name;
                // console.log(create_attr_read(val));
                return create_attr_read(val).then(function (q) {
                    resolve(q);
                }, function (err) {
                    reject(err);
                });
                break;
        };



    });
}

//For custom query user 
function universal_query(query) {
    return new Promise(function (resolve, reject) {
        switch (get_config.config.db_type) {
            //query setting mysql//
            case 'mysql':
                //call query setting in forlder query with file mysql, run function insert_query
                require('../query/mysql').query(query, null, function (err, data) {
                    if (err) {
                        // if error
                        reject({
                            action: false
                        });
                    } else {
                        // get data field from table
                        resolve({
                            action: true,
                            data: data
                        });
                    }
                });

                break;

            default:
                break;
        }
    });
}
module.exports.insert = insert;
// module.exports.insertWithModel = insert_with_model;

module.exports.read = read;
// module.exports.models = models;
module.exports.update = update;
module.exports.erase_query = erase_query;
module.exports.query = universal_query;