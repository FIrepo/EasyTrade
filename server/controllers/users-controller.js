'use strict';

let encryption = require('../utilities/encryption'),
    CONTROLLER_NAME = 'users';

module.exports = function(app, usersData){
    return{
        getRegister: function(req, res, next) {
            res.render(CONTROLLER_NAME + '/register');
        },
        postRegister: function(req, res, next) {
            let newUserData = req.body;

            if (newUserData.password !== newUserData.confirmPassword) {
                req.session.error = 'Passwords do not match!';
                res.redirect('/register');
            } else if(newUserData.password.length < 6){
                req.session.error = 'Password should be at least 6 characters long!';
                res.redirect('/register');
            } else {
                newUserData.salt = encryption.generateSalt();
                newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
                usersData.create(newUserData, function(err, user) {
                    if (err) {
                        req.session.error = 'Failed to register new user: ' + err;
                        res.redirect('/register');
                        return;
                    }

                    req.logIn(user, function(err) {
                        if (err) {
                            res.status(400);
                            return res.send({reason: err.toString()});
                        }
                        else {
                            res.redirect('/');
                        }
                    })
                });
            }
        },
        getLogin: function(req, res) {
            res.render(CONTROLLER_NAME + '/login');
        },
        getAllUsers: function (req, res){
            let params = req.params || {};
            if(app.locals.currentUser && app.locals.currentUser.role === 'admin'){
                usersData.all(params, function(err, dbUsers){
                    if(err){
                        req.session.error = 'Users cannot be obtained!';
                        res.redirect('/');
                        return;
                    }
                    res.send(dbUsers); //TODO jade
                    return;
                })
            } else {
                req.session.error = 'For admins only';
                res.redirect('/');
            }
        },
        updateUser: function(req, res){
            if(app.locals.currentUser
                && (app.locals.currentUser.username === req.body.username
                || app.locals.currentUser.role === 'admin')){
                usersData.update(req.body.username, req.body, function(updatedUser){
                    app.locals.currentUser = updatedUser;
                    res.render('users/profile');
                    //res.redirect('/profile');//TODO jade
                })
            } else {
                req.session.error = 'Not for you';
                res.redirect('/');
            }
        }
    };
};