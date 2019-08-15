//We use express js for serve,Thank you Express JS 
const express = require('express');
var app = express();
//------------------------------

function set_listen(port){
    app.set('port', port || 3000);
}

module.exports.set_listen = set_listen;
