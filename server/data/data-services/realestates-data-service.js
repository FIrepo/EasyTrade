'use strict';

let mongoose = require('mongoose');
let RealEstate = mongoose.model('RealEstate');

module.exports = {
    create: function(realEstate, callback) {
        console.log(realEstate);
        RealEstate.create(realEstate, callback);
    },
    update: function (estate, callback) {
        RealEstate.update({_id: estate.id}, estate, function (err, estate) {
            if (err) {
                callback(err);
            } else {
                callback(null, estate);
            }
        })
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
    },
    getLast: function(number, callback){

        RealEstate.find()
            .sort({dateOfCreation: -1})
            .limit(number)
            .exec(callback);
    }
};