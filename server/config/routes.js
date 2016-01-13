'use strict';

let auth = require('./auth'),
    controllers = require('../controllers'),
    services = require('../data/data-services');

module.exports = function(app) {
    app.get('/api/all-users', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).getAllUsers);
    app.get('/register', controllers['users-controller'](app, services['users-data-service']).getRegister);
    app.post('/register', controllers['users-controller'](app, services['users-data-service']).postRegister);
    app.get('/login', controllers['users-controller'](app, services['users-data-service']).getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.isAuthenticated, auth.logout);
    app.get('/all-users', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).getAllUsers);
    app.get('/profile', auth.isAuthenticated, function(req, res){
        res.render('users/profile');
    });
    app.post('/profile', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).updateUser);
    app.get('/profile/:username', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).getAllUsers);
    app.post('/profile/:username', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).updateUser);
    app.get('/profile/delete/:id', auth.isAuthenticated, controllers['users-controller'](app, services['users-data-service']).deleteUser);
    app.get('/admin-panel', auth.isAuthenticated, function(req, res){
        res.render('users/admin-panel');
    });

    app.get('/real-estates/search', controllers['realestates-controller']().getSearch);
    app.get('/real-estates/create', controllers['realestates-controller']().getCreateForm);
    app.post('/real-estates/create', controllers['realestates-controller']().create);
    app.get('/real-estates', controllers['realestates-controller']().getSearch);
    app.get('/real-estates/:id', controllers['realestates-controller']().getRealEstate);
    app.get('/real-estates/:id/edit', controllers['realestates-controller']().getEditView);
    app.post('/real-estates/:id', controllers['realestates-controller'](app).edit);

    app.get('/cars', controllers['cars-controller'](app, services['cars-data-service']).getMainView);
    app.get('/cars/create', auth.isAuthenticated, controllers['cars-controller'](app, services['cars-data-service']).getCreate);
    app.post('/cars/create', auth.isAuthenticated, controllers['cars-controller'](app, services['cars-data-service']).postCreate);
    app.get('/cars/all', controllers['cars-controller'](app, services['cars-data-service']).getAllCars);
    app.get('/cars/search', controllers['cars-controller'](app, services['cars-data-service']).getSearch);
    app.get('/cars/delete/:id', controllers['cars-controller'](app, services['cars-data-service']).deleteCar);
    app.get('/cars/details/:id', controllers['cars-controller'](app, services['cars-data-service']).getCar);

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.redirect('/');
    });
};