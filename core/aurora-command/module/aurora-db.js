#!/usr/bin/env node
/*
For command, we use commander and inquirer
Thank you so much commander and inquirer

https://www.npmjs.com/package/commander
https://www.npmjs.com/package/inquirer
*/
const program = require('commander');
const inquirer = require('inquirer');

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
! Program command for create schema file !
*/
program.command('schema:create <value>').action((value)=>{
  //Run create schema file
  return compile.create_schema(value);
});

// allow commander to parse `process.argv`
program.parse(process.argv);

module.exports.create_database = create_database;