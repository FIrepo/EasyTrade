'use strict';

let data = require('../data/data-services/realEstates-data-service');
let CONTROLLER_NAME = 'realEstates',
    realEstateTypes = ['One-room apartement', 'Two-room apartement', 'Tree-room apartement', 'Four-room apartement',
        'Multi-aprtement', 'Maisonette', 'Office', 'Studio', 'Attic', 'Floor', 'House', 'Country house',
        'Shop', 'Garage', 'Hotel'],
    dealTypes = ['Rent', 'Sold'];

module.exports = function () {
    return {
        getCreateForm: function (req, res, next) {
            res.render(CONTROLLER_NAME + '/create', {estates: realEstateTypes, deals: dealTypes});
        },
        create: function (req, res, next) {
            let newRealEstate = req.body;
            data.create(newRealEstate, function (err, data) {
                if (err) {
                    res.redirect('/');
                    return
                }

                res.redirect('/real-estates/all');
            });
        },
        getAll: function (req, res, next) {
            data.all(null, function (err, estates) {
                if (err) {
                    req.session.error = 'Estates cannot be obtained!';
                    res.redirect('/');
                    return;
                }

                console.log(estates)
                res.render(CONTROLLER_NAME+'/all-real-estates',{estates: estates});
                return;
            })
        }
    };
};