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
            data.create(req.body, function (err, data) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                    return
                }

                res.redirect('/');
            });
        }
    };
};