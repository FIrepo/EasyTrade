'use strict';

let Car = require('mongoose').model('Car');

module.exports = {
    create: function(car, callback) {
        Car.create(car, callback);
    },
    all: function(query, callback){
        query = query || {};
        Car.find(query, function(err, cars){
            if(err){
                callback(err);
            } else {
                callback(null, cars);
            }
        });
    },
    update: function(carId, newProps, callback){
        this.all({_id: carId}, function(cars){
            callback(cars[0].update(newProps));
        })
    }
};