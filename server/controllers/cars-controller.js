'use strict';

let CONTROLLER_NAME = 'cars',
    ITEMS_PER_PAGE = 10,
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

            // TODO: Validation

            carsData.create(newCarData, function (err, car) {
                if (err) {
                    req.session.error = 'Failed to create new car advertisement: ' + err;
                    res.redirect('/cars/create');
                    return;
                }
                req.session.info = `${car.make} ${car.model} created successfully.`;
                res.redirect('/cars/details/' + car._id);
            });
        },
        getSearch: function (req, res) {
            res.render(CONTROLLER_NAME + '/search', {carMakes: carMakes});
        },
        getAllCars: function (req, res) {
            let query = {},
                pagination = {sort: '-price'},
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

            if (req.query.sort) {
                req.query.direction = req.query.direction || '';
                pagination.sort = req.query.direction + req.query.sort;
            }

            carsData.count(query, function (err, carsCount) {
                if (err) {
                    req.session.error = 'Cars cannot be obtained!: ' + err.errmsg;
                    res.redirect('/');
                    return;
                }

                searchPages = Math.ceil(carsCount / ITEMS_PER_PAGE);
                pagination.itemsPerPage = ITEMS_PER_PAGE;

                carsData.all(query, pagination, function (err, cars) {
                    if (err) {
                        req.session.error = 'Cars cannot be obtained!: ' + err.errmsg;
                        res.redirect('/');
                        return;
                    }

                    res.render(CONTROLLER_NAME + '/listed-cars', {
                        cars: cars,
                        searchUrl: searchUrl,
                        searchPages: searchPages,
                        carsCount: carsCount,
                        sort: {
                            orderBy: req.query.sort,
                            direction: req.query.direction ?  'descending' : 'ascending'
                        }
                    });
                })
            });
        },
        getCar: function (req, res) {
            let carId = req.params.id,
                canModerate = false;
            carsData.byId({_id: carId}, function (err, car) {
                if (err) {
                    req.session.error = 'The car advertisement with the provided id cannot be obtained: ' + err.errmsg;
                    res.redirect('/cars/search');
                    return;
                }
                if (car) {
                    if (app.locals.currentUser
                        && ((app.locals.currentUser.role == 'admin') || (app.locals.currentUser._id.id == car.creator.id))) {
                        canModerate = true;
                    }

                    res.render(CONTROLLER_NAME + '/car-details', {car: car, canModerate: canModerate});
                } else {
                    req.session.error = 'The car advertisement with the provided id cannot be obtained.';
                    res.redirect('/cars/search');
                }
            });
        },
        getUpdate: function (req, res) {
            let carId = req.params.id;
            carsData.byId({_id: carId}, function (err, car) {
                if (err) {
                    req.session.error = 'The car advertisement with the provided id cannot be obtained: ' + err.errmsg;
                    res.redirect('/cars/search');
                    return;
                }
                if (app.locals.currentUser
                    && ((app.locals.currentUser.role == 'admin')
                    || (app.locals.currentUser._id.id === car.creator.id))) {
                    res.render(CONTROLLER_NAME + '/update', {car: car, carMakes: carMakes});
                }
                else {
                    req.session.error = 'You do not have sufficient rights to update the specified car advertisement.';
                    res.redirect('/cars/search');
                }
            });
        },
        postUpdate: function (req, res) {
            let carId = req.params.id;
            carsData.byId({_id: carId}, function (err, car) {
                if (err) {
                    req.session.error = 'The car advertisement with the provided id cannot be obtained: ' + err.errmsg;
                    res.redirect('/cars/search');
                    return;
                }
                if (app.locals.currentUser
                    && ((app.locals.currentUser.role == 'admin')
                    || (app.locals.currentUser._id.id === car.creator.id))) {

                    carsData.update(req.params.id, req.body, function (err) {
                        if (err) {
                            req.session.error = 'The car advertisement with the provided id cannot be obtained: ' + err.errmsg;
                            res.redirect('/cars/search');
                            return;
                        }
                        req.session.info = `${car.make} ${car.model} updated successfully.`;
                        res.redirect('/cars/details/' + req.params.id);
                    })
                }
                else {
                    req.session.error = 'You do not have sufficient rights to update the specified car advertisement.';
                    res.redirect('/cars/search');
                }
            });
        },
        deleteCar: function (req, res) {
            carsData.byId(req.params.id, function (err, carToDelete) {

                if (err || !carToDelete) {
                    req.session.error = 'The car advertisement with the provided id cannot be obtained: ' + err.errmsg;
                    res.redirect('/cars/search');
                    return;
                }
                if (app.locals.currentUser
                    && ((app.locals.currentUser.role == 'admin') || (app.locals.currentUser._id.id == carToDelete.creator.id))) {
                    carsData.delete(carToDelete._id, function () {
                        req.session.info = `${carToDelete.make} ${carToDelete.model} deleted successfully.`;
                        res.redirect('/cars/search');
                    })
                }
                else {
                    req.session.error = 'You do not have sufficient rights to delete the car advertisement with the provided id.';
                    res.redirect('/cars/details/' + req.params.id);
                }
            });
        }
    };
};