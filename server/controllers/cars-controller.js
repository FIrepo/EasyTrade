'use strict';

let CONTROLLER_NAME = 'cars',
    ITEMS_PER_PAGE = 10,
    DEFAULT_PAGINATION = {itemsPerPage: Number.MAX_SAFE_INTEGER, page: 1},
    carMakes = ["Acura", "Alfa Romeo", "AMC", "Aston Martin", "Audi", "Avanti", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Daewoo", "Daihatsu", "Datsun", "DeLorean", "Dodge", "Eagle", "Ferrari", "FIAT", "Fisker", "Ford", "Freightliner", "Geo", "GMC", "Honda", "HUMMER", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "Mercury", "Merkur", "MINI", "Mitsubishi", "Nissan", "Oldsmobile", "Peugeot", "Plymouth", "Pontiac", "Porsche", "RAM", "Renault", "Rolls-Royce", "Saab", "Saturn", "Scion", "smart", "SRT", "Sterling", "Subaru", "Suzuki", "Tesla", "Toyota", "Triumph", "Volkswagen", "Volvo", "Yugo"];

module.exports = function (app, carsData) {
    return {
        getMainView: function (req, res) {
            res.render(CONTROLLER_NAME + '/main-view');
        },
        getCreate: function (req, res) {
            res.render(CONTROLLER_NAME + '/create', {carMakes: carMakes});
        },
        postCreate: function (req, res) {
            let newCarData = req.body;
            newCarData.creator = app.locals.currentUser._id;
            newCarData.dateOfCreation = Date.now();
            newCarData.email = newCarData.email || app.locals.currentUser.email;
            newCarData.imagesUrl = newCarData.imagesUrl || '/images/car.jpg';
            // TODO: Validation

            carsData.create(newCarData, function (err, car) {
                if (err) {
                    req.session.error = 'Failed to create new car advertisement: ' + err;
                    res.redirect('/cars/create');
                    return;
                }
                res.redirect('/cars/details/' + car._id);
            });
        },
        getSearch: function (req, res) {
            res.render(CONTROLLER_NAME + '/search', {carMakes: carMakes});
        },
        getAllCars: function (req, res) {
            let query = {},
                pagination = {},
                searchUrl = req.originalUrl,
                lastIndexOfPage = searchUrl.lastIndexOf('&page'),
                endIndex = lastIndexOfPage > -1 ? lastIndexOfPage : searchUrl.length,
                searchPages;

            searchUrl = searchUrl.substr(0, endIndex);

            pagination.page = req.query.page || 1;

            if (req.query.make) {
                query.make = req.query.make;
            }

            if (req.query.model) {
                query.model = req.query.model;
            }

            if (req.query.transmission) {
                query.transmission = req.query.transmission;
            }

            if (req.query.fuel) {
                query.fuel = req.query.fuel;
            }

            if (req.query.from) {
                query.price = query.price || {};
                query.price['$gt'] = req.query.from;
            }
            if (req.query.to) {
                query.price = query.price || {};
                query.price['$lt'] = req.query.to;
            }

            carsData.all(query, DEFAULT_PAGINATION, function (err, allCars) {
                if (err) {
                    req.session.error = 'Cars cannot be obtained!: ' + err;
                    res.redirect('/');
                    return;
                }

                searchPages = Math.ceil(allCars.length / ITEMS_PER_PAGE);
                pagination.itemsPerPage = ITEMS_PER_PAGE;

                carsData.all(query, pagination, function (err, cars) {
                    if (err) {
                        req.session.error = 'Cars cannot be obtained!: ' + err;
                        res.redirect('/');
                        return;
                    }

                    res.render(CONTROLLER_NAME + '/listed-cars', {
                        cars: cars,
                        searchUrl: searchUrl,
                        searchPages: searchPages,
                        allCars: allCars
                    });
                })
            });
        },
        getCar: function (req, res) {
            let carId = req.params.id;
            carsData.all({_id: carId}, DEFAULT_PAGINATION, function (err, cars) {
                if (err) {
                    req.session.error = 'The car with the provided id cannot be obtained: ' + err;
                    res.redirect('/cars/search');
                    return;
                }
                if (cars) {
                    res.render(CONTROLLER_NAME + '/car-details', {car: cars[0]});
                } else {
                    req.session.error = 'The car with the provided id cannot be obtained: ' + err;
                    res.redirect('/cars/search');
                }
            });
        },
        updateCar: function (req, res) {
            if (app.locals.currentUser
                && (app.locals.currentUser._id === req.body.creator._id)) {
                carsData.update(req.body._id, req.body, function (updatedCar) {
                    res.render(CONTROLLER_NAME + '/car-details', {car: updatedCar});
                })
            }
        }
    };
};