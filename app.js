try {
    //For run module 
    aurora = require('./core/compile');

    //Config for use config.js
    /* If you want custom config, you must run command "node ./app.js name_config"
        Example :
        1. You have abc.config.js
        2. You can run this custom enviroment with run command :
            node ./app.js abc
    */
    module.exports.config_enviroment = process.argv[process.argv.length-1] || 'main';
    
    //For enviroment
    aurora.enviroment();

    //For run serve
    aurora.serve();

    //aurora.schema("RUN");

} catch (error) {
    
}
