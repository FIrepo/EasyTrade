'use strict';

let passport = require('passport');

module.exports = {
    login: function (req, res, next) {
        let auth = passport.authenticate('local', function (err, user) {
            if (err) return next(err);
            if (!user) {
                req.session.error = 'Invalid user name or password!';
                res.redirect('/login');
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                req.session.info = `${user.username} logged in successfully.`;
                res.redirect('/');
            })
        });

        auth(req, res, next);
    },
    logout: function (req, res) {
        req.logout();
        req.session.info = `You logged out successfully.`;
        res.redirect('/');
    },
    isAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            req.session.error = 'You should be logged in to view this page!';
            res.redirect('/login');
        }
        else {
            next();
        }
    }
};