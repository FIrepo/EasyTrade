//'use strict';
//
//let express = require('express'),
//    carRouter = express.Router(),
//    controllers = require('../controllers'),
//    services = require('../data/data-services');
//
//carRouter
//    .get('/cars', controllers['cars-controller'](app, services['cars-data-service']).getMainView)
//    //.get('/cars/details/:id', controllers['cars-controller'](app, services['cars-data-service']).getCar)
//    .get('/cars/create', controllers['cars-controller'](app, services['cars-data-service']).getCreate)
//    .post('/cars/create', controllers['cars-controller'](app, services['cars-data-service']).postCreate)
//    .get('/cars/all', controllers['cars-controller'](app, services['cars-data-service']).getAllCars);
//
//module.exports = carRouter;