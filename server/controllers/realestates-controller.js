'use strict';

let data = require('../data/data-services/realEstates-data-service');
let CONTROLLER_NAME = 'realEstates',
    ITEMS_PER_PAGE = 10,
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
                res.redirect('/real-estates');
            });
        },
        getRealEstate: function (req, res, next) {
            data.findById(req.params.id, function (err, estate) {
                if (err) {
                    res.send(err);
                } else {
                    res.render(CONTROLLER_NAME + '/details', {estate: estate});
                }
            });
        },
        getEditView: function (req, res, next) {
            data.findById(req.params.id, function (err, estate) {
                if (err) {
                    res.send(err);
                } else {
                    res.render(CONTROLLER_NAME + '/edit', {estate: estate, estates: realEstateTypes, deals: dealTypes});
                }
            });
        },

        getSearch: function (req, res, next) {
            let query = {},
                pagination = {},
                searchUrl = req.originalUrl,
                lastIndexOfPage = searchUrl.lastIndexOf('&page'),
                endIndex = lastIndexOfPage > -1 ? lastIndexOfPage : searchUrl.length,
                searchPages;

            searchUrl = searchUrl.substr(0, endIndex);

            pagination.page = req.query.page || 1;

            if (req.query.type) {
                query.type = req.query.type;
            }

            if (req.query.city) {
                query.city = req.query.city;
            }

            if (req.query.dealType) {
                query.dealType = req.query.dealType;
            }

            if (req.query.quadrature) {
                query.quadrature = req.query.quadrature;
            }

            if (req.query.from) {
                query.price = query.price || {};
                query.price['$gt'] = req.query.from;
            }
            if (req.query.to) {
                query.price = query.price || {};
                query.price['$lt'] = req.query.to;
            }

            data.count(query, function (err, estatesCount) {
                console.log('..IN SEARCH COUNT...');
                console.log(err)
                console.log('after error')
                if (err) {
                    req.session.error = 'Cars cannot be obtained!: ' + err;
                    res.redirect('/');
                    return;
                }

                searchPages = Math.ceil(estatesCount / ITEMS_PER_PAGE);
                pagination.itemsPerPage = ITEMS_PER_PAGE;

                data.all(query, pagination, function (err, estates) {
                    res.render(CONTROLLER_NAME + '/search', {
                        estates: estates,
                        estatesTypes: realEstateTypes,
                        dealTypes: dealTypes
                    });
                })
            })
        },
        edit: function (req, res, next) {
            let realEstate = req.body;
            realEstate.id = req.url.substr(req.url.lastIndexOf('/') + 1);

            data.update(realEstate, function (err, callback) {
                res.redirect('/real-estates');
                res.end();
            })
        }
    };
};