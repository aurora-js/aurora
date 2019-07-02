//For run module 
aurora = require('./core/compile');

//For run serve
aurora.serve();

//Config for use config.js
module.exports.enviroment = 'main';

aurora.enviroment();
