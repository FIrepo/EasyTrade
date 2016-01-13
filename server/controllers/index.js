'use strict';

let fs = require('fs'),
    path = require('path'),
    controllers = {};

(function () {
    console.log('Loading controllers...');
    fs.readdirSync(__dirname)
        .filter(file => file.indexOf('controller') >= 0)
        .forEach(file => {
            let controllerName = file.substring(0, file.indexOf('-'));
            controllers[`${controllerName}`] = require(path.join(__dirname, file));
        });
}());

module.exports = controllers;