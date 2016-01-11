'use strict';

let CONTROLLER_NAME = 'cars',
    carMakes = ["Acura", "Alfa Romeo", "AMC", "Aston Martin", "Audi", "Avanti", "Bentley", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Daewoo", "Daihatsu", "Datsun", "DeLorean", "Dodge", "Eagle", "Ferrari", "FIAT", "Fisker", "Ford", "Freightliner", "Geo", "GMC", "Honda", "HUMMER", "Hyundai", "Infiniti", "Isuzu", "Jaguar", "Jeep", "Kia", "Lamborghini", "Lancia", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati", "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "Mercury", "Merkur", "MINI", "Mitsubishi", "Nissan", "Oldsmobile", "Peugeot", "Plymouth", "Pontiac", "Porsche", "RAM", "Renault", "Rolls-Royce", "Saab", "Saturn", "Scion", "smart", "SRT", "Sterling", "Subaru", "Suzuki", "Tesla", "Toyota", "Triumph", "Volkswagen", "Volvo", "Yugo"];

module.exports = function (app, carsData) {
    return {
        getMainView: function (req, res, next) {
            res.render(CONTROLLER_NAME + '/main-view');
        },
        getCreate: function (req, res, next) {
            res.render(CONTROLLER_NAME + '/create', {carMakes: carMakes});
        },
        postCreate: function (req, res, next) {
            let newCarData = req.body;
            newCarData.creator = app.locals.currentUser._id;
            newCarData.dateOfCreation = Date.now();
            newCarData.email = newCarData.email || app.locals.currentUser.email;
            newCarData.imagesUrl = newCarData.imagesUrl || '/images/car.jpg';
            // TODO: Validation

            carsData.create(newCarData, function (err, car) {
                if (err) {
                    req.session.error = 'Failed to create new car advertisement: ' + err;
                    res.redirect(CONTROLLER_NAME + '/create');
                    return;
                }
                res.redirect('/cars/details/' + car._id);
            });
        },
        getSearch: function (req, res) {
            res.render(CONTROLLER_NAME + '/search');
        },
        postSearch: function (req, res) {

        },
        getAllCars: function (req, res) {
            let query = req.params || {};
            carsData.all(query, function (err, cars) {
                if (err) {
                    req.session.error = 'Cars cannot be obtained!: ' + err;
                    res.redirect('/');
                    return;
                }

                res.render(CONTROLLER_NAME + '/listed-cars', {cars: cars});
            })
        },
        getCar: function (req, res) {
            let carId = req.params.id;
            carsData.all({_id: carId}, function (err, cars) {
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