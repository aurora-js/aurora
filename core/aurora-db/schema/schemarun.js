const fs = require('fs')
const exec = require('child_process').exec

const async = require('async');

//Folder file schema
const schema_folder = './database/schema/';

//Name file from foreach in folder ./database/schema 
const files = fs.readdirSync(schema_folder); // reading files from folders

//Function for run schema 
function run(){

    //Foreach file to get up value
    files.forEach(element => {
        var schemafile = require('../../../database/schema/'+element);
        console.log(schemafile.up.blueprint);
    });
    //console.log(files);
}

module.exports.run = run;