'use strict';

let path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/easyTrade',
        mongoLabDb: 'mongodb://megateam:easydbpass@ds035985.mongolab.com:35985/easytradedb',
        port: process.env.PORT || 3000
    }
};