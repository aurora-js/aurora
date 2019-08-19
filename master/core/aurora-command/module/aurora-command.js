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
program.version('Aurora - 0.0.3 Alpha\nAurora Command - 0.0.1', '-v, --version');

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
        compile = require('../../compile');
        if (answers.db == true) {
          return compile.db(command, value.type, value.database);
        } else {
          return process.exit();
        }
    });
  }, 200);
}

// allow commander to parse `process.argv`
program.parse(process.argv);


module.exports.create_database = create_database;