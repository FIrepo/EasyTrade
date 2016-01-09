'use strict';

let UsersController = require('./users-controller');

module.exports = {
    users: UsersController
};


//var fs = require('fs'),
//    path = './server/controllers';
//
//module.exports = function() {
//    console.log('Loading controllers...');
//    fs.readdirSync(path)
//        .filter(file => file.indexOf('controller'))
//        .forEach(file => require('./' + file)());
//    console.log(files);
//};