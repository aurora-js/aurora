//For run module 
aurora = require('./core/compile');

//For run serve
aurora.serve();

//Config for use config.js
/* If you want custom config, you must run command "node ./app.js name_config"
    Example :
    1. You have abc.config.js
    2. You can run this custom enviroment with run command :
        node ./app.js abc
*/
module.exports.enviroment = process.argv[2] || 'main';

//aurora.enviroment();
