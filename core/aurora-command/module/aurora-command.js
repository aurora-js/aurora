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
      console.log('test');
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