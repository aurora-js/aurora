#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');

let aurora_db = require('./module/auroradb');

program.command('db:run <value>').action((value)=>{
    aurora_db.aurora_db('run',value);
});

// allow commander to parse `process.argv`
program.parse(process.argv);