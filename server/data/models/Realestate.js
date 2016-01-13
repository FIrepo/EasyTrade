'use strict';

let mongoose = require('mongoose');


module.exports.init = function () {
    let realEstateSchema = mongoose.Schema({
        type: {
            type: String,
            required: true
        },
        quadrature: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        city: {
            type: String,
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
        dateOfCreation: {
            type: Date,
            required: true,
            default: new Date()
        },
        moreInformation: String
    });

    var RealEstate = mongoose.model('RealEstate', realEstateSchema);
};


