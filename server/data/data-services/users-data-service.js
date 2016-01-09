'use strict';

let User = require('mongoose').model('User');

module.exports = {
    create: function(user, callback) {
        User.create(user, callback);
    },
    all: function(query, callback){
        query = query || {};
        User.find(query, 'username -_id', function(err, users){
            if(err){
                callback(err);
            } else {
                callback(null, users);
            }
        });
    }
};