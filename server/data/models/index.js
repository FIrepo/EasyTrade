'use strict';

let fs = require('fs'),
    path = require('path'),
    models = {};

(function() {
    console.log('Loading models...');
    fs.readdirSync(__dirname)
        .filter(file => file.indexOf('index') < 0)
        .forEach(file => {
            let modelName = file.substring(0, file.lastIndexOf('.'));
            models[`${modelName}`] = require(path.join(__dirname, file));
            models[`${modelName}`].init();
        });
}());

module.exports = models;