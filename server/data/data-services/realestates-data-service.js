'use strict';

let mongoose = require('mongoose');
let RealEstate = mongoose.model('RealEstate');

module.exports = {
    create: function(realEstate, callback) {
        RealEstate.create(realEstate, callback);
    },
    all: function(query, callback){
        query = query || {};
        RealEstate.find(query, 'type price', function(err, realEstates){
            if(err){
                callback(err);
            } else {
                callback(null, realEstates);
            }
        });
    }
};