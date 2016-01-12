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

    app.get('/real-estates/search', controllers['realestates-controller']().getSearch);
    app.get('/real-estates/create', controllers['realestates-controller']().getCreateForm);
    app.post('/real-estates/create', controllers['realestates-controller']().create);
    app.get('/real-estates', controllers['realestates-controller']().getSearch);
    app.get('/real-estates/:id', controllers['realestates-controller']().getRealEstate);
    app.get('/real-estates/:id/edit', controllers['realestates-controller']().getEditView);
    app.post('/real-estates/:id', controllers['realestates-controller']().edit);

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('*', function(req, res) {
        res.redirect('/');
    });
};