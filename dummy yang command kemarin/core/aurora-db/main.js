let run = require('./db/rundb');

function main(module,text){
    switch (module) {
        case 'run':
            rundb(text);
            break;
        default:
            break;
    }
}

function rundb(text){
    return run.run(text);
}


module.exports.main = main;