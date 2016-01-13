'use strict';

//let data = require('../data/data-services/realEstates-data-service');
let CONTROLLER_NAME = 'realEstates',
    ITEMS_PER_PAGE = 10,
    realEstateTypes = ['One-room apartement', 'Two-room apartement', 'Tree-room apartement', 'Four-room apartement',
        'Multi-aprtement', 'Maisonette', 'Office', 'Studio', 'Attic', 'Floor', 'House', 'Country house',
        'Shop', 'Garage', 'Hotel'],
    dealTypes = ['Rent', 'Sold'];

module.exports = function (app, data) {
    return {
        getCreateForm: function (req, res) {
            if (app.locals.currentUser == undefined) {
                res.redirect('/real-estates');
            } else {
                res.render(CONTROLLER_NAME + '/create', {estates: realEstateTypes, deals: dealTypes});
            }
        },
        create: function (req, res) {
            let newRealEstate = req.body;
            newRealEstate.creator = app.locals.currentUser._id;

            data.create(newRealEstate, function (err, data) {
                if (err) {
                    req.session.error = 'Failed to create new real estate advertisement: ' + err.errmsg;
                    res.redirect('/real-estates/create');
                    return
                }

                req.session.info = `Created successfully.`;
                res.redirect('/real-estates');
            });
        },
        getRealEstate: function (req, res) {
            let estateModerate = false;
            data.findById(req.params.id, function (err, estate) {
                if (err) {
                    req.session.error = 'The real estate advertisement with the provided id cannot be obtained: ' + err.errmsg;
                    res.redirect('/real-estates');
                    return
                }

                if (estate) {
                    if (app.locals.currentUser
                        && ((app.locals.currentUser.role == 'admin') || (app.locals.currentUser._id.id == estate.creator.id))) {
                        estateModerate = true;
                    }

                    res.render(CONTROLLER_NAME + '/details', {estate: estate, estateModerate: estateModerate});
                } else {
                    req.session.error = 'The real estate advertisement with the provided id cannot be obtained: ' + err.errmsg;
                    res.redirect('/real-estates');
                }
            });
        },
        getEditView: function (req, res) {
            data.findById(req.params.id, function (err, estate) {
                if (err) {
                    req.session.error = 'The real estate advertisement with the provided id cannot be obtained: ' + err.errmsg;
                    res.redirect('/real-estates');
                }

                if (app.locals.currentUser
                    && ((app.locals.currentUser.role == 'admin') || (app.locals.currentUser._id.id == estate.creator.id))) {
                    res.render(CONTROLLER_NAME + '/edit', {estate: estate, estates: realEstateTypes, deals: dealTypes});
                } else {
                    req.session.error = 'The real estate advertisement with the provided id cannot be obtained: ' + err.errmsg;
                    res.redirect('/real-estates');
                }
            });
        },
        getSearch: function (req, res) {
            let query = {},
                pagination = {},
                searchUrl = req.originalUrl,
                lastIndexOfPage = searchUrl.lastIndexOf('&page'),
                endIndex = lastIndexOfPage > -1 ? lastIndexOfPage : searchUrl.length,
                searchPages,
                estateModerate = false;

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

            if (app.locals.currentUser) {
                estateModerate = true;
            }

            data.count(query, function (err, estatesCount) {
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
                        dealTypes: dealTypes,
                        estateModerate: estateModerate
                    });
                })
            })
        },
        edit: function (req, res) {
            let realEstate = req.body;
            realEstate.id = req.url.substr(req.url.lastIndexOf('/') + 1);
            data.update(realEstate, function (err, callback) {
                res.redirect('/real-estates');
                res.end();
            })
        },
        deleteEstate: function (req, res) {
            console.log('..IN DELETE...');
            if (app.locals.currentUser == undefined) {
                res.redirect('/real-estates');
            } else {
                //let realEstate = req.body;
                let id = req.url.substr(req.url.lastIndexOf('/') + 1);
                data.delete(id, function (err, callback) {
                    res.redirect('/real-estates');
                    res.end();
                })
            }
        }
    };
};