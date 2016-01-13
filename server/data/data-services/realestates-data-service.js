'use strict';

let mongoose = require('mongoose');
let RealEstate = mongoose.model('RealEstate');

module.exports = {
    create: function (realEstate, callback) {
        RealEstate.create(realEstate, callback);
    },
    findById: function (id, callback) {
        RealEstate.findById(id, function (err, realEstate) {
            if (err) {
                callback(err);
            } else {
                callback(null, realEstate);
            }
        })
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
    count: function (query, callback) {
        query = query || {};
        RealEstate.count(query, function (err, estatesCount) {
            if (err) {
                console.log(err)
                callback(err);
            } else {
                callback(null, estatesCount);
            }
        });
    },
    all: function (query, pagination, callback) {
        query = query || {};

        RealEstate.find(query)
            .skip(pagination.itemsPerPage * (pagination.page - 1))
            .limit(pagination.itemsPerPage)
            .exec(function (err, estates) {
                if (err) {
                    console.log(err)
                    callback(err);
                } else {
                    callback(query, estates);
                }
            });
    },
    delete: function (id, callback) {
        RealEstate.remove(req.params.id, function (err, res) {
            if (err) {
                console.log('Estate cannot be removed: ' + err);
                callback(err);
            } else {
                callback(res);
            }
        });
    },
    getLast: function (number, callback) {

        RealEstate.find()
            .sort({dateOfCreation: -1})
            .limit(number)
            .exec(callback);
    }
};