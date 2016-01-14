'use strict';

let encryption = require('../utilities/encryption'),
    CONTROLLER_NAME = 'users';

module.exports = function (app, usersData) {
    return {
        getRegister: function (req, res) {
            res.render(CONTROLLER_NAME + '/register');
        },
        postRegister: function (req, res) {
            let newUserData = req.body;
            if(newUserData.role){
                newUserData.role = undefined;
            }

            if (newUserData.password !== newUserData.confirmPassword) {
                req.session.error = 'Passwords do not match!';
                res.redirect('/register');
            } else if (newUserData.password.length < 6) {
                req.session.error = 'Password should be at least 6 characters long!';
                res.redirect('/register');
            } else {
                newUserData.salt = encryption.generateSalt();
                newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
                usersData.create(newUserData, function (err, user) {
                    if (err) {
                        req.session.error = 'Failed to register new user.' + err.errmsg;
                        res.redirect('/register');
                        return;
                    }

                    req.logIn(user, function (err) {
                        if (err) {
                            res.status(400);
                            return res.send({reason: err.toString()});
                        }
                        else {
                            req.session.info = `${user.username} registered and logged in successfully.`;
                            res.redirect('/');
                        }
                    })
                });
            }
        },
        getLogin: function (req, res) {
            res.render(CONTROLLER_NAME + '/login');
        },
        getAllUsers: function (req, res) {
            let view = req.params.username ? 'single' : 'all',
                params = req.params,
                api = req.url.indexOf('api') !== -1;
            if (app.locals.currentUser && app.locals.currentUser.role === 'admin') {
                usersData.all(params, function (err, responseModelUsers) {
                    if (view === 'single') {
                        if (api) {
                            res.send(responseModelUsers[0]);
                        } else {
                            res.render('users/other-user-profile', {profileUser: responseModelUsers[0]});
                        }
                    } else {
                        if (api) {
                            res.send(responseModelUsers);
                        } else {
                            res.render('users/all-users', {users: responseModelUsers});
                        }
                    }
                })
            } else {
                req.session.error = 'For admins only';
                res.redirect('/');
            }
        },
        getProfile: function (req, res){
            res.render('users/profile');
        },
        getAdminPanel:function (req, res){
            res.render('users/admin-panel');
        },
        updateUser: function (req, res) {
            if (app.locals.currentUser
                && (app.locals.currentUser.username === req.body.username
                || app.locals.currentUser.role === 'admin')) {
                let newUserData = req.body;
                if (newUserData.password) {
                    if (newUserData.password && newUserData.password.length < 6) {
                        req.session.error = 'Password should be at least 6 characters long!';
                        res.redirect('back');
                    } else {
                        newUserData.salt = encryption.generateSalt();
                        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
                    }
                }

                usersData.update(newUserData.username, req.body, function (err, updatedUser) {
                    if (err) {
                        req.session.error = 'There was problem updating the user profile: ' + err.errmsg;
                        res.redirect('/');
                        return;
                    }

                    app.locals.currentUser = updatedUser;
                    req.session.info = `${updatedUser.username} updated successfully.`;
                    res.redirect('back');
                })
            } else {
                req.session.error = 'You do not have sufficient permissions to access this page!';
                res.redirect('/');
            }
        },
        deleteUser: function (req, res) {
            let username = req.params.id;
            if (app.locals.currentUser
                && (app.locals.currentUser.username === username
                || app.locals.currentUser.role === 'admin')) {

                usersData.delete(username, function () {
                    req.method = 'GET';
                    req.logout();
                    req.session.info = `${username} deleted successfully.`;
                    res.redirect('/');
                });
            } else {
                req.session.error = 'You do not have sufficient permissions to access this page!';
                res.redirect('/');
            }
        }
    };
};