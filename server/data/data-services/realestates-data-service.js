'use strict';

let mongoose = require('mongoose');
let RealEstate = mongoose.model('RealEstate');

module.exports = {
    create: function(realEstate, callback) {
        RealEstate.create(realEstate, callback);
    },
    findById: function(id,callback){
        RealEstate.findById(id, function(err, realEstate){
            if(err){
                callback(err);
            } else {
                callback(null,realEstate);
            }
        })
    },
    all: function(query, callback){
        query = query || {};
        RealEstate.find(query, 'type price address', function(err, realEstates){
            if(err){
                callback(err);
            } else {
                callback(null, realEstates);
            }
        });
    }
};