
    //For run module 
    var aurora = require('./core/compile');

    //Config for use config.js
    /* If you want custom config, you must run command "node ./app.js name_config"
        Example :
        1. You have abc.config.js
        2. You can run this custom enviroment with run command :
            node ./app.js abc
    */
    module.exports.config_enviroment = process.argv[process.argv.length-1] || 'main';

    //For run without aurora command
    if(!process.argv[1].includes('aurora-command.js')){
        //For Run Function In Call App.js
        try{
            //For run serve
            aurora.serve();
            // console.log(aurora.model('prodiModelss','create',{Email : 'user mail.com', PASSWORD : '656656', password_confirmation : 'user mail.com'}));
        } catch (error) {
            return console.log(error);
        }
    }
