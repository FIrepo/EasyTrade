'use strict';

let auth = require('./auth'),
    controllers = require('../controllers'),
    services = require('../data/data-services');

module.exports = function(app) {
    app.get('/register', controllers['users-controller'](app, services['users-data-service']).getRegister);
    app.post('/register', controllers['users-controller'](app, services['users-data-service']).postRegister);
    app.get('/login', controllers['users-controller'](app, services['users-data-service']).getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.isAuthenticated, auth.logout);
    app.get('/all-users', controllers['users-controller'](app, services['users-data-service']).getAllUsers);
    app.get('/profile', function(req, res){
        res.render('users/profile');
    });
    app.post('/profile', controllers['users-controller'](app, services['users-data-service']).updateUser);

    app.get('/cars', controllers['cars-controller'](app, services['cars-data-service']).getMainView);
    app.get('/cars/details/:id', controllers['cars-controller'](app, services['cars-data-service']).getCar);
    app.get('/cars/create', auth.isAuthenticated, controllers['cars-controller'](app, services['cars-data-service']).getCreate);
    app.post('/cars/create', auth.isAuthenticated, controllers['cars-controller'](app, services['cars-data-service']).postCreate);
    app.get('/cars/all', controllers['cars-controller'](app, services['cars-data-service']).getAllCars);




    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.redirect('/');
    });
};