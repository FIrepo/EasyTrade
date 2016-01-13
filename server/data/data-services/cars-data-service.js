'use strict';

let Car = require('mongoose').model('Car');

module.exports = {
    create: function (car, callback) {
        Car.create(car, callback);
    },
    all: function (query, pagination, callback) {
        query = query || {};
        Car.find(query)
            .sort(pagination.sort)
            .skip(pagination.itemsPerPage * (pagination.page - 1))
            .limit(pagination.itemsPerfindPage)
            .exec(function (err, cars) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, cars);
                }
            });
    },
    getLast: function(number, callback){
        Car.find({})
            .sort({dateOfCreation: -1})
        .limit(number)
        .exec(callback);
    },
    count: function (query, callback) {
        query = query || {};
        Car.count(query, function (err, carsCount) {
            if (err) {
                callback(err);
            } else {
                callback(null, carsCount);
            }
        });
    },
    byId: function (carId, callback) {
        Car.findOne({_id: carId}, function (err, car) {
            if (err) {
                callback(err);
            } else {
                callback(null, car);
            }
        })
    },
    update: function (carId, newProps, callback) {
        let updateProps = {$set: newProps};
        Car.findOneAndUpdate({_id: carId}, updateProps, function (err, car) {
            if (err) {
                callback(err);
            } else {
                callback(null, car);
            }
        })
    },
    delete: function (carId, callback) {
        Car.find({_id: carId}).remove().exec(function (err, deletedCar) {
            if (err) {
                callback(err);
            } else {
                callback(null, deletedCar);
            }
        })
    }
};