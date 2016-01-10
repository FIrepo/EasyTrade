'use strict';

let mongoose = require('mongoose');


module.exports.init = function () {
    let realEstateSchema = mongoose.Schema({
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        dealType:{
            type: String,
            required: true
        },
        description: String
    });

    var RealEstate = mongoose.model('RealEstate', realEstateSchema);
};


