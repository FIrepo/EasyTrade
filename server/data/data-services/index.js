'use strict';

let fs = require('fs'),
    path = require('path'),
    services = {};

(function() {
    console.log('Loading services...');
    fs.readdirSync(__dirname)
        .filter(file => file.indexOf('service') >= 0)
        .forEach(file => {
            let serviceName = file.substring(0, file.indexOf('-'));
            services[`${serviceName}`] = require(path.join(__dirname, file));
        });
}());

module.exports = services;