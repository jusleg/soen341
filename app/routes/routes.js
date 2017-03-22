/**
 * Created by Kim on 1/31/2017.
 */
'use strict';
const path = require('path');
const User = require('../models/user');
const crypto = require('crypto-js');


module.exports = function(app, passport) {


    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/views/landing.html'));
    });

    app.get('/login', (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/home');
        } else {
            res.sendFile(path.join(__dirname, '../../public/views/login.html'));
        }
    });

    app.get('/register', (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/home');
        } else {
            res.sendFile(path.join(__dirname, '../../public/views/register.html'));
        }
    });

    app.post('/login',
        passport.authenticate('local-login', {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true,
            session: true
        }));


    app.post('/register',
        passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/register',
            failureFlash: true,
        }));

    // to get the currently logged in user's info
    app.get('/currentUser', isLoggedIn, function (req, res) {
        let data = {
            username: req.user.name,
            email: req.user.id,
            online: req.session.online,
            classUser: req.user.classUser,
            classMod: req.user.classMod
        };
        res.send(data);
    });

    app.get('/logout',
        function (req, res) {
            User.findOne({id: req.session.passport.user}, (err, user) => {
                if (user.online = true) {
                    console.log('logging out');
                    user.online = false;
                    req.session.online = false;
                }
            });
            req.logout();
            res.redirect('/');
        });

    app.get('/forgot/:id/:pass', function (req, res) {

        //TODO NEEDS DECRYPTION HERE

        var email = req.params.id;

        User.findOne({id: email}, (err, user) => {
            if (err)
                return done(err);
            if (user) {
                user.pass = req.params.pass;
                console.log("Password has been modified!");
                user.save((err) => {
                    if (err)
                        throw err;

                });
                //TODO : FRONT END WHEN THE PASSWORD HAS CHANGED
            }

        })
    });

    app.get('/verify/:id', function (req, res) {


        var email = crypto.AES.decrypt(unescape(req.params.id),"ch3vald3gu3rreftwgr8b8m8").toString(crypto.enc.Utf8);

        User.findOne({id: email}, (err, user) => {
            if (err)
                return done(err);
            if (user) {
                user.validated = true;
                user.save((err) => {
                    if (err)
                        throw err;

                });
                //TODO : FRONT END WHEN THE ACCOUNT IS VERIFIED

            } else {
                //TODO: FRONT END WHEN THE ACCOUNT IS NOT FOUND
            }
        });

        app.get('/home', isLoggedIn, function (req, res) {
            console.log(req.user);
            res.sendFile(path.join(__dirname, '/../../public/app/app.html'));
        });

        app.get('/resetpassword', function (req, res) {
            res.sendFile(path.join(__dirname, '../../public/views/pass-change.html'));
        });

        //Unknown routes
        app.get('*', function (req, res) {
            res.send('ERROR 404 NOT FOUND, NO SUCH PAGE PLS GO BACK TO MAIN PAGE BRUH', 404);
        });


    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            req.session.online = true;
            return next();
        } else {
            res.send('You are not logged in. Please login before you access the chat!');
        }
    };

}


