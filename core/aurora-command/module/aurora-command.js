#!/usr/bin/env node
/*
For command, we use commander and inquirer
Thank you so much commander and inquirer

https://www.npmjs.com/package/commander
https://www.npmjs.com/package/inquirer
*/
const program = require('commander');
const inquirer = require('inquirer');

//Version Auora 
program.version('Aurora - 0.1 Dev\nAurora Command - 0.0.1', '-v, --version');

//Require compile module
var compile = require('../../compile');


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
      if (answers.db == true) {
        return compile.db(command, value.type, value.database);
      } else {
        return process.exit();
      }
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
  //If db:run not have config to default config main
  if (process.argv.length === 2) {
    process.argv.push('main');
  }

  //For check have schema value or not
  var schema = check_detail_schema();


  //Run schema
  return compile.schema('RUN', schema);
});

/*
! Program command for update db!
*/
program.command('db:update').description('Run Schema For Update Table On Database').option('-s --schema <schema>', 'Run Schema For Certain File').action(() => {
  //If db:update not have config to default config main
  if (process.argv.length === 2) {
    process.argv.push('main');
  }

  //For check have schema value or not
  var schema = check_detail_schema();

  //Update schema for run DB
  return compile.schema('UPDATE', schema);
});

/*
! Program command for delete db!
*/
program.command('db:delete').description('Run Schema For Delete Some Field or Table On Database').option('-s --schema <schema>', 'Run Schema For Certain File').action(() => {
  //If db:delete not have config to default config main
  if (process.argv.length === 2) {
    process.argv.push('main');
  }

  //For check have schema value or not
  var schema = check_detail_schema();

  //Update schema for run DB
  return compile.schema('DELETE', schema);
});

/*
! Program command for refresh db!
*/
program.command('db:refresh').description('Run Schema For Refresh Table On Database').option('-s --schema <schema>', 'Run Schema For Certain File').action(() => {
  //If db:delete not have config to default config main
  if (process.argv.length === 2) {
    process.argv.push('main');
  }

  //For check have schema value or not
  var schema = check_detail_schema();

  //Update schema for run DB
  return compile.schema('REFRESH', schema);
});


/*
! Program command for create schema file !
! Value Required No Space !
*/
program.command('schema:create <value>').description('Create a New Schema File').action((value) => {
  //Run create schema file
  return compile.create_schema(value);
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

//! ------------------------------------------------------------------------------------------------------- !


// ! ------------------------------------------ For Aurora CRUD ----------------------------------- !

/*
! Program command for create model file!
! Value Required No Space !
*/
program.command('model:create <value>').description('Create a New Model File').option('-t --table <table_name>', 'Add Value Table Name on Create Model File').option('-g --generate', 'Create Model With Generate Rules From Table').action(()=>{
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
  return compile.create_model(process.argv[3],table_name,generate);

});

//! ------------------------------------------------------------------------------------------------------- !


// allow commander to parse `process.argv`
program.parse(process.argv);


module.exports.create_database = create_database;