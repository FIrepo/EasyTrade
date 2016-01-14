'use strict';

let auth = require('./auth'),
    controllers = require('../controllers'),
    services = require('../data/data-services'),
    http = require('http');

module.exports = function (app, upload) {
    app.get('/api/all-users', auth.isAuthenticated, controllers.users(app, services.users).getAllUsers);
    app.get('/register', controllers.users(app, services.users).getRegister);
    app.post('/register', controllers.users(app, services.users).postRegister);
    app.get('/login', controllers.users(app, services.users).getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.isAuthenticated, auth.logout);
    app.get('/all-users', auth.isAuthenticated, controllers.users(app, services.users).getAllUsers);
    app.get('/profile', auth.isAuthenticated, function (req, res) {
        res.render('users/profile');
    });
    app.post('/profile', auth.isAuthenticated, controllers.users(app, services.users).updateUser);
    app.get('/profile/:username', auth.isAuthenticated, controllers.users(app, services.users).getAllUsers);
    app.post('/profile/:username', auth.isAuthenticated, controllers.users(app, services.users).updateUser);
    app.get('/profile/delete/:id', auth.isAuthenticated, controllers.users(app, services.users).deleteUser);
    app.get('/admin-panel', auth.isAuthenticated, function (req, res) {
        res.render('users/admin-panel');
    });

    app.get('/real-estates/search', controllers.realestates(app, services.realestates).getSearch);
    app.get('/real-estates/create', controllers.realestates(app, services.realestates).getCreateForm);
    app.post('/real-estates/create', upload.single('image'), controllers.realestates(app, services.realestates).create);
    app.get('/real-estates', controllers.realestates(app, services.realestates).getSearch);
    app.post('/real-estates/delete/:id', controllers.realestates(app, services.realestates).deleteEstate);
    app.get('/real-estates/:id', controllers.realestates(app, services.realestates).getRealEstate);
    app.get('/real-estates/:id/edit', controllers.realestates(app, services.realestates).getEditView);
    app.post('/real-estates/:id', controllers.realestates(app, services.realestates).edit);

    app.get('/cars', controllers.cars(app, services.cars).getMainView);
    app.get('/cars/create', auth.isAuthenticated, controllers.cars(app, services.cars).getCreate);
    app.post('/cars/create', upload.single('image'), auth.isAuthenticated, controllers.cars(app, services.cars).postCreate);
    app.get('/cars/update/:id', auth.isAuthenticated, controllers.cars(app, services.cars).getUpdate);
    app.post('/cars/update/:id', upload.single('image'), auth.isAuthenticated, controllers.cars(app, services.cars).postUpdate);
    app.get('/cars/all', controllers.cars(app, services.cars).getAllCars);
    app.get('/cars/search', controllers.cars(app, services.cars).getSearch);
    app.get('/cars/delete/:id', controllers.cars(app, services.cars).deleteCar);
    app.get('/cars/details/:id', controllers.cars(app, services.cars).getCar);

    app.get('/', controllers.home(app, services.cars, services.realestates).getLast);

    app.get('*', function (req, res) {
        res.redirect('/');
    });
};