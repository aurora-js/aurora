#!/usr/bin/env node
/*
For command, we use commander and inquirer
Thank you so much commander and inquirer

https://www.npmjs.com/package/commander
https://www.npmjs.com/package/inquirer
*/
const program = require('commander');
const inquirer = require('inquirer');

/*
Thank you so much lodash, console.table and fuzzy

https://www.npmjs.com/package/lodash
https://www.npmjs.com/package/console.table
https://www.npmjs.com/package/fuzzy
*/
const _ = require('lodash');
const fuzzy = require('fuzzy');
const cTable = require('console.table');

//Version Auora 
program.version('Aurora - 0.0.5 Alpha\nAurora Command - 0.0.1', '-v, --version');

//Require compile module
var path = require('path');
var fs   = require('fs');
var lib  = path.join(path.dirname(fs.realpathSync(__filename)), '../../');


var compile = require(lib + '/compile');
// require('../../compile');
// console.log(compile);

// ! ------------------------------------------ For Aurora DB ----------------------------------- !

// Run create database with question
/*
Value is {
  database : name_database,
  type      : type_database
}
*/
function create_database(command, value) {
  return setTimeout(function () {
    inquirer.prompt([{
      name: 'db',
      type: 'confirm',
      message: 'Do you want make ' + value.database + ' database ?',
    }]).then((answers) => {
      get_directory().then(function(d){
        // copy source folder to destination
        compile = require(d + '/core/compile');
        if (answers.db == true) {
          return compile.db(command, value.type, value.database);
        } else {
          return process.exit();
        }
      },function(err){
        return console.log(err);
      });
    });
  }, 200);
}

//Universal function for give message to user in command
function send_message(value) {
  console.log(value);
  return process.exit();
}

/*
! Program command for run db!
*/
program.command('db:run').description('Run Schema For Create Table To Database').option('-s --schema <schema>', 'Run Schema For Certain File').action(() => {
    get_directory().then(function(d){
      // copy source folder to destination
      compile = require(d + '/core/compile');

      //If db:run not have config to default config main
      if (process.argv.length === 2) {
        process.argv.push('main');
      }

      //For check have schema value or not
      var schema = check_detail_schema();


      //Run schema
      return compile.schema('RUN', schema);
    },function(err){
        return console.log(err);
    });
});

/*
! Program command for update db!
*/
program.command('db:update').description('Run Schema For Update Table On Database').option('-s --schema <schema>', 'Run Schema For Certain File').action(() => {
  get_directory().then(function(d){
    // copy source folder to destination
    compile = require(d + '/core/compile'); 
    //If db:update not have config to default config main
    if (process.argv.length === 2) {
      process.argv.push('main');
    }

    //For check have schema value or not
    var schema = check_detail_schema();

    //Update schema for run DB
    return compile.schema('UPDATE', schema);
  },function(err){
    return console.log(err);
  });
});

/*
! Program command for delete db!
*/
program.command('db:delete').description('Run Schema For Delete Some Field or Table On Database').option('-s --schema <schema>', 'Run Schema For Certain File').action(() => {
  get_directory().then(function(d){
    // copy source folder to destination
    compile = require(d + '/core/compile'); 
    //If db:delete not have config to default config main
    if (process.argv.length === 2) {
      process.argv.push('main');
    }

    //For check have schema value or not
    var schema = check_detail_schema();

    //Update schema for run DB
    return compile.schema('DELETE', schema);
  },function(err){
    return console.log(err);
  });
});

/*
! Program command for refresh db!
*/
program.command('db:refresh').description('Run Schema For Refresh Table On Database').option('-s --schema <schema>', 'Run Schema For Certain File').action(() => {
  get_directory().then(function(d){
    // copy source folder to destination
    compile = require(d + '/core/compile'); 
    //If db:delete not have config to default config main
    if (process.argv.length === 2) {
      process.argv.push('main');
    }

    //For check have schema value or not
    var schema = check_detail_schema();

    //Update schema for run DB
    return compile.schema('REFRESH', schema);
  },function(err){
    return console.log(err);
  });
});


/*
! Program command for create schema file !
! Value Required No Space !
*/
program.command('schema:create <value>').description('Create a New Schema File').action((value) => {
  get_directory().then(function(d){
    // copy source folder to destination
    compile = require(d + '/core/compile'); 
    //Run create schema file
    return compile.create_schema(value);
  },function(err){
    return console.log(err);
  });
});

//Function for check  have command detail schema for run or not
function check_detail_schema() {
  if (process.argv[3] == '-s' || process.argv[3] == '--schema') {
    //If no custom config
    if (process.argv[5] == undefined) {
      process.argv.push('main');
    }
    return process.argv[4];
  }
  else if ((process.argv[2] != '-s' || process.argv[3] != '--schema') && (process.argv[3] != undefined) && (process.argv[4] != undefined)) {
    console.log('Command -s / --schema not found');
    return process.exit();
  }
}


//For generate create schema 
var table_name_schema = null; 
var column_schema = null;
var run_generate = 0;
var status_edit = false;
var column_edit = 0;

var column_generate = {
  number : null,
  name : null,
  type : null,
  length : null,
  primary_key : false,
  unique : false,
  nullable : false
}

var column_relation = {
  column_foreign_key : null,
  column_references : null,
  table_references : null,
  on_delete : null,
  on_update : null
}

var column_to_generate = [];

inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));

//Type column
var column_type = ['increment',
                   'integer', 
                   'decimal', 
                   'float', 
                   'double', 
                   'real',
                   'bit',
                   'boolean',         
                   'serial',            
                   'Date',       
                   'datetime', 
                   'timestamp',         
                   'time',                  
                   'year',        
                   'char',            
                   'varchar',  
                   'tinytext',
                   'text',      
                   'mediumtext',
                   'longtext',            
                   'binary',        
                   'varbinary',      
                   'tinyblob',       
                   'mediumblob',       
                   'blob',                  
                   'longblob',           
                   'enums',                      
                   'set',                      
                   'geometry',         
                   'point',                    
                   'linestring',            
                   'polygon',                  
                   'multipoint',           
                   'multilinestring',    
                   'multipolygon',        
                   'geometrycollection' 
                  ];

//Status relation
var status_relation = ['CASCADE',
                   'RESTRICT'
                  ];

//For add column 
function add_column(field,value,newrow){
    column_generate["number"] = run_generate;
    column_generate[field] = value;
    if (newrow == true) {  
        if(status_edit==true){
          column_to_generate[column_edit-1] = column_generate;
        }else{
          column_to_generate.push(column_generate);
        }
        column_generate = {
          number : null,
          name : null,
          type : null,
          length : null,
          primary_key : false,
          unique : false,
          nullable : false
        }
    }
}

//For add relation
function add_relation(){

}

//For print column to create
function show_column(){
  return new Promise(function(resolve){
      if(column_to_generate.length != 0){
        console.log("\nColumn to create on table "+table_name_schema+":\n")
        const table = cTable.getTable(column_to_generate);
        console.log(table);
        resolve();
      }else{
        resolve();
      }
  });
}

//For search type column
function searchColumnType(answers, input) {
  input = input || '';
  return new Promise(function(resolve) {
    setTimeout(function() {
      var fuzzyResult = fuzzy.filter(input, column_type);
      resolve(
        fuzzyResult.map(function(el) {
          return el.original;
        })
      );
    }, _.random(30, 500));
  });
}

program.command('schema:generate').description('Create schema with generate').action(() => {
  return input_table_name();
});

//Function for create table name 
function input_table_name(){
  /*
  ! Program command for create table name !
  ! Value Required No Space !
  */
  return inquirer
  .prompt([
    {
      name: 'table_name',
      type: 'input',
      message: 'What table name do you want to make ?',
    },
  ])
  .then(answers => {
    table_name_schema = answers.table_name;
    input_column();
  });
}

//Function for input column
function input_column(){
  return inquirer
  .prompt([
    {
      name: 'column',
      type: 'number',
      message: 'How many columns do you want to make ?',
    },
  ])
  .then(answers => {
      column_schema = answers.column;
      create_column();
  });
}

//Function for create column 
function create_column(){
    if(run_generate < column_schema){
        //If edit column
        if(status_edit == true){
          run_generate = column_edit;
        }else{
          run_generate++;
        }
        
        show_column().then(function(){
          return create_column_name();
        });
    }else{

    }
}

//Function for add column name 
function create_column_name(){
  return inquirer
  .prompt([
    {
      name: 'column',
      type: 'input',
      message: 'The name of column '+run_generate+' that you want to make ?',
    },
  ])
  .then(answers => {
      add_column('name',answers.column,false);
      create_column_type();
  });
}

//Function for add column type
function create_column_type(){
  return inquirer
  .prompt([
    {
      type: 'autocomplete',
      name: 'column_type',
      message: 'The type of column '+run_generate+' that you want to make ?',
      source: searchColumnType,
    }
  ])
  .then(function(answers) {
    
    //If with input length
    if(answers.column_type != 'increment' && answers.column_type != 'float' && answers.column_type != 'double' && answers.column_type != 'real' && answers.column_type != 'boolean' && answers.column_type != 'serial' && answers.column_type != 'year' && answers.column_type != 'tinytext' && answers.column_type != 'text' && answers.column_type != 'mediumtext' && answers.column_type != 'longtext' && answers.column_type != 'tinyblob' && answers.column_type != 'mediumblob' && answers.column_type != 'blob' && answers.column_type != 'longblob' && answers.column_type != 'geometry' && answers.column_type != 'point' && answers.column_type != 'linestring' && answers.column_type != 'polygon' && answers.column_type != 'multipoint' && answers.column_type != 'multilinestring' && answers.column_type != 'multipolygon' && answers.column_type != 'geometrycollection'){
      add_column('type',answers.column_type,false);
      if(column_generate.type == 'enums' || column_generate.type ==' set'){
        return create_column_set_value();
      }
      return create_column_length();
    }else{
      //If no input length
      if(answers.column_type != 'increment'){
        add_column('type',answers.column_type,false);
        return create_column_attribute();
      }else{
        add_column('type',answers.column_type,true);
        //If for edit column
        if(run_generate < column_schema && status_edit == false){
          return create_column();
        }else{
          show_column().then(function(){
            return confirm_column();
          });
        }
      }
    }
    
  });
}

//Function for add column length
function create_column_length(){
  return inquirer
  .prompt([
    {
      name: 'column',
      type: 'number',
      message: 'The length of column '+run_generate+' that you want to make ?',
    },
  ])
  .then(answers => {
    
    if(column_generate.type != "increment"){
      add_column('length',answers.column,false);
      return create_column_attribute();
    }else{
      add_column('length',answers.column,true);
      if(run_generate < column_schema && status_edit == false){
        return create_column();
      }else{
        show_column().then(function(){
          return confirm_column();
        });
      }
    } 
  });
}

//Function for add column set value for enums type and set
function create_column_set_value(){
  return inquirer
  .prompt([
    {
      name: 'column',
      type: 'input',
      message: 'The value of column '+run_generate+' that you want to make ? (Example : a,b,c,d)',
    },
  ])
  .then(answers => {
    
    if(column_generate.type != "increment"){
      add_column('length',"\""+answers.column+"\"",false);
      return create_column_attribute();
    }else{
      add_column('length',"\""+answers.column+"\"",true);
      if(run_generate < column_schema && status_edit == false){
        return create_column();
      }else{
        show_column().then(function(){
          return confirm_column();
        });
      }
    } 
  });
}

//For add attribute to column 
function create_column_attribute(){
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'attr',
      message: 'Attribute column 1 do you want to create ?',
      choices: [
        'No Attribute','primary','unique','nullable' 
      ],
    },
  ])
  .then(answers => {
    // var status_add_attribute = 0;
    if(answers.attr == 'primary'){
      // if(answers.attr.length == 1 || answers.attr.length -1 == status_add_attribute){
        add_column('primary_key',true,true);
      // }else{
      //   status_add_attribute++;
      //   add_column('primary_key',true,false);
      // }
      
    }

    if(answers.attr == 'unique'){
      // if(answers.attr.length == 1 || answers.attr.length -1 == status_add_attribute){
        add_column('unique',true,true);
      // }else{
      //   status_add_attribute++;
      //   add_column('unique',true,false);
      // }
        
    }

    if(answers.attr == 'nullable'){
      // if(answers.attr.length == 1 || answers.attr.length -1 == status_add_attribute){
        add_column('nullable',true,true);
      // }else{
      //   status_add_attribute++;
      //   add_column('nullable',true,false);
      // }
      
    }

    if(answers.attr == 'No Attribute'){
        add_column('length',column_generate.length,true);
    }


    if(run_generate < column_schema && status_edit == false){
      return create_column();
    }else{
      show_column().then(function(){
        return confirm_column();
      });
    }
  });
}

//For confirm column
function confirm_column(){
  inquirer.prompt([{
    name: 'confirmation',
    type: 'confirm',
    message: 'Are the columns you want to make correct ?',
  }]).then((answers) => {
      if (answers.confirmation == true) {
        return confirm_relation();
      } else {
        return edit_column();
      }
  });
}

//For edit in index column 
function edit_column(){
  return inquirer
  .prompt([
    {
      name: 'column',
      message: 'What column number do you want to change ?',
    },
  ])
  .then(answers => {
      status_edit = true;
      column_edit = answers.column;
      run_generate = 0;
      create_column();
  });
}

//For create relation table 
function confirm_relation(){
  inquirer.prompt([{
    name: 'confirmation',
    type: 'confirm',
    message: 'Does this table have a relation ?',
  }]).then((answers) => {
      if (answers.confirmation == true) {
        return create_relation();
      } else {
        return generate_file_schema(table_name_schema,column_to_generate,column_relation);
      }
  });
}

//For input relation 
function create_relation(){
  return inquirer
  .prompt([
    {
      type : 'input',
      name: 'column_fk',
      message: 'Local column name for relation ?'
    },
    {
      type : 'input',
      name: 'table_relation',
      message: 'Table to relation ?'
    },
    {
      type : 'input',
      name: 'references_column',
      message: 'References column name for relation ?'
    },
    {
      type : 'list',
      name: 'on_update',
      message: 'On update?',
      choices: [
        'CASCADE','RESTRICT'
      ]
    },
    {
      type : 'list',
      name: 'on_delete',
      message: 'On Delete?',
      choices: [
        'CASCADE','RESTRICT'
      ]
    },
  ])
  .then(answers => {
    column_relation['column_foreign_key'] = answers.column_fk;
    column_relation['column_references'] = answers.references_column;
    column_relation['table_references'] = answers.table_relation;
    column_relation['on_delete'] = answers.on_delete;
    column_relation['on_update'] = answers.on_update;
    confirm_relation_to_create();
  });
}

//Function for confirm relation
function confirm_relation_to_create(){
  inquirer.prompt([{
    name: 'confirmation',
    type: 'confirm',
    message: 'Column to relation is '+column_relation['column_foreign_key']+" references to table "+column_relation['table_references']+" on column "+column_relation['column_references']+" And action on update is "+column_relation['on_update']+" then on delete is "+column_relation['on_delete']+", it's correct ?",
  }]).then((answers) => {
      if (answers.confirmation == true) {
        return generate_file_schema(table_name_schema,column_to_generate,column_relation);
      } else {
        return create_relation();
      }
  });
}
//For generate file schema with column
function generate_file_schema(table_name,column,relation){
  get_directory().then(function(d){
      compile = require(d + '/core/compile'); 
      return compile.create_schema_generate(table_name,column,relation).then(function(name_file){
        var filename = name_file+'.js';
        //Run db run 
        return run_db(name_file);
        
      });
  });
}

//For confirm want db run or not 
function run_db(name_file){
  inquirer.prompt([{
    name: 'confirmation',
    type: 'confirm',
    message: 'Do you want create this table to your database ?',
  }]).then((answers) => {
      if (answers.confirmation == true) {
        inquirer.prompt([{
          name: 'name_config',
          type: 'input',
          message: 'Configure the connection you want to use ? (if you want to use default configuration, directly enter)',
          default: 'main',
        }]).then((answers) => {
          //Run Command Db Run
          const { exec } = require('child_process');
          exec('aurora db:run -s '+name_file+' '+answers.name_config, (err, stdout, stderr) => {
            if (err) {
              console.log(err);
              return process.exit();
            } 
            return console.log(`${stdout}`);
          });

        });
      } else {
        return console.log('Schema generate successfully, if you want create this table to your database you can run\nCommand Aurora DB Run');
      }
  });
}
//! ------------------------------------------------------------------------------------------------------- !


// ! ------------------------------------------ For Aurora CRUD ----------------------------------- !

/*
! Program command for create model file!
! Value Required No Space !
*/
program.command('model:create <value>').description('Create a New Model File').option('-t --table <table_name>', 'Add Value Table Name on Create Model File').option('-g --generate', 'Create Model With Generate Rules From Table').action(()=>{
  get_directory().then(function(d){
    // copy source folder to destination
    compile = require(d + '/core/compile'); 
    var table_name = "";
    var generate = false;

    //Check have value table name or not
    if (process.argv[4] == '-t' || process.argv[4] == '--table') {
      //If no custom config
      if (process.argv[5] == undefined) {
        process.argv.push('main');
      }

      //If table name is -g or --generate
      if (process.argv[5] == "-g" || process.argv[5] == "--generate") {
        console.log('ERROR!\n' + 'Table Name Not Found');
        return process.exit();
      }

      table_name = process.argv[5];
    }

    //If Have generate and table not null
    if ((process.argv[6] == '-g' || process.argv[6] == '--generate') && (process.argv[4] == '-t' || process.argv[4] == '--table')) {
      //If no custom config
      if (process.argv[7] == undefined) {
        process.argv.push('main');
      }
      generate = true;
    }
    //Run create model file
    return compile.create_model(process.argv[3],table_name,generate).then(function(){
        process.exit();
    },function(err){
        console.log(err);
        process.exit();
    });
  },function(err){
    return console.log(err);
  });

});

//command controller
program.command('controller:create <value>').description('Create a New Controller File').option('-m --model <model_name>', 'Add Value Model Name on Create CRUD File').action(()=>{
  get_directory().then(function(d){
    // copy source folder to destination
    compile = require(d + '/core/compile'); 
    var model_name = "";
    var generate = false;

    //Check have value table name or not
    if (process.argv[4] == '-m' || process.argv[4] == '--model') {
      //If no custom config
      if (process.argv[5] == undefined) {
        process.argv.push('main');
      }

      model_name = process.argv[5];
    }

    //Run create model file
    return compile.create_crud(process.argv[3],model_name).then(function(){
      process.exit();
    },function(err){
        console.log(err);
        process.exit();
    });
  },function(err){
    return console.log(err);
  });
});


//For generate all 
/*
! Program command for create all file (Model,Controller)!
! Value Required No Space !
*/
program.command('generate:run <value>').description('Create a New Model,Controller File').option('-t --table <table_name>', 'Add Value Table Name').action(()=>{
  get_directory().then(function(d){
    // copy source folder to destination
    compile = require(d + '/core/compile');
    var table_name = "";
    var generate = false;

    //Check have value table name or not
    if (process.argv[4] == '-t' || process.argv[4] == '--table') {
      //If no custom config
      if (process.argv[6] == undefined) {
        process.argv.push('main');
      }

      //If table name is -g or --generate
      if (process.argv[5] == undefined) {
        console.log('ERROR!\n' + 'Table Name Not Found');
        return process.exit();
      }

      table_name = process.argv[5];
    }else{
        console.log('ERROR!\n' + 'Table Name Not Found');
        return process.exit();
    }

    // Run create model file
    return compile.generate('RUN',process.argv[3],table_name).then(function(){
      process.exit();
    },function(err){
        console.log(err);
        process.exit();
    });
  },function(err){
    return console.log(err);
  });

});
//! ------------------------------------------------------------------------------------------------------- !


//For create project
program.command('new:project <value>').description('Create a New Project With Aurora JS').action((value) => {
  // include fs-extra package
  var fs_copy = require("fs-extra");

  //For get directory in run command
  const { exec } = require('child_process');
  exec('cd', (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return console.log('Error Get Dir');
    }

    var source = path.join(path.dirname(fs.realpathSync(__filename)), '../../../master');
    var destination = stdout.replace(/\r?\n|\r/g,'').toString()+"\\"+value;
    // copy source folder to destination
    fs_copy.copy(source, destination, function (err) {
        if (err){
            console.log('Error Create Project, Please Try Again\nSorry :(');
            return console.error(err);
        }
        console.log('YEAY!\nProject Created Successfully\nHappy using Aurora JS :)');
    });
  });
  
});

//Get Directory
function get_directory(){
  return new Promise(function(resolve,reject){
      //For get directory in run command
      const { exec } = require('child_process');
      exec('cd', (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          console.log('Error Get Dir');
          return reject(err);
        }

        return resolve(stdout.replace(/\r?\n|\r/g,'').toString())
      });
  });
}

// allow commander to parse `process.argv`
program.parse(process.argv);


module.exports.create_database = create_database;