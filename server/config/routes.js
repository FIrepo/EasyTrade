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

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.redirect('/');
    });
};