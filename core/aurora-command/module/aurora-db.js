#!/usr/bin/env node
/*
For command, we use commander and inquirer
Thank you so much commander and inquirer

https://www.npmjs.com/package/commander
https://www.npmjs.com/package/inquirer
*/
const program = require('commander');
const inquirer = require('inquirer');

//Version Command Auora DB
program.version('Aurora DB - 0.0.1');

//Require compile module
var compile = require('../../compile');



// Run create database with question
/*
Value is {
  database : name_database,
  type      : type_database
}
*/
function create_database(command, value) {
  return inquirer.prompt([{
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
}

//Universal function for give message to user in command
function send_message(value) {
  console.log(value);
  return process.exit();
}

/*
! Program command for run db!
*/
program.command('db:run').action(()=>{
  //If db:run not have config to default config main
  if (process.argv.length === 2) {
    process.argv.push('main');
  }

  //Run schema
  return compile.schema('RUN');
});

/*
! Program command for update db!
*/
program.command('db:update').action(()=>{
  //If db:update not have config to default config main
  if (process.argv.length === 2) {
    process.argv.push('main');
  }

  //Update schema for run DB
  return compile.schema('UPDATE');
});

/*
! Program command for delete db!
*/
program.command('db:delete').action(()=>{
  //If db:delete not have config to default config main
  if (process.argv.length === 2) {
    process.argv.push('main');
  }

  //Update schema for run DB
  return compile.schema('DELETE');
});

/*
! Program command for refresh db!
*/
program.command('db:refresh').action(()=>{
  //If db:delete not have config to default config main
  if (process.argv.length === 2) {
    process.argv.push('main');
  }

  //Update schema for run DB
  return compile.schema('REFRESH');
});


/*
! Program command for create schema file !
*/
program.command('schema:create <value>').action((value)=>{
  //Run create schema file
  return compile.create_schema(value);
});

// allow commander to parse `process.argv`
program.parse(process.argv);

module.exports.create_database = create_database;