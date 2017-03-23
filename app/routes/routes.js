/**
 * Created by Kim on 1/31/2017.
 */
'use strict';
const path = require('path');
const User = require('../models/user');
const classroom = require('../models/Classes.js');
const crypto = require('crypto-js');
const parseMePLzr = require('body-parser');
const email = require('./email');

module.exports = function(app, passport) {

    var hashCode = function hashCode(s){
        if(s == null){
            return null;
        }
        let tempString = s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        return tempString;
    };

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
    app.get('/currentUser', isLoggedIn, function(req, res) {
        User.findOne({"id":req.user.id}).populate('classMod classUser','-chat').exec(function(err,user){
            if (err) return handleError(err);
            let data = {
                username: req.user.name,
                email: req.user.id,
                online: req.session.online,
                classUser: user.classUser,
                classMod: user.classMod
            };
            res.send(data);
        })

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

    app.post('/reset', function(req, res) {
        var token = req.body.token;
        console.log(token);
        var pass = req.body.password;
        pass = hashCode(pass);
        var text = token + " " + pass;
        console.log(text);
        var email = crypto.AES.decrypt(decodeURIComponent(token),"ch3vald3gu3rr3ftwgr8b8m8").toString(crypto.enc.Utf8);
        console.log(email);
        User.findOne({id: email}, (err, user) => {
            if (err){
                res.send("Oh hey. I did not find your account.");
                return done(err);
            }
            if (user) {
                user.pass = pass;
                user.save((err) => {
                    if (err)
                        throw err;

                });
                res.send("Oh hey you just changed you password! Shine on you crazy diamond!");
            } else {
                res.send("Oh hey. I did not find your account2.");
            }

        })


    });

    app.get('/emailreset', function (req,res){
       console.log(req.query.email);
        email.forgotPass(req.query.email);
    });

    app.get('/home', isLoggedIn, function (req, res) {
        console.log(req.user);
        res.sendFile(path.join(__dirname, '/../../public/app/app.html'));
    });

    app.get('/resetpassword', function (req, res) {
        res.sendFile(path.join(__dirname, '../../public/views/pass-change.html'));
    });

    app.get('/verify/:id', function (req, res) {
        var email = crypto.AES.decrypt(decodeURIComponent(req.params.id),"ch3vald3gu3rr3ftwgr8b8m8").toString(crypto.enc.Utf8);
        console.log(email);
        User.findOne({id: email}, (err, user) => {
            if (err)
                return done(err);
            if (user) {
                user.validated = true;
                user.save((err) => {
                    if (err)
                        throw err;

                });
                //TODO FRONT END WHEN ACCOUNT IS VERIFIED
                res.send("Your account was validated");

            } else {
                //TODO FRONT END WHEN ACCOUNT IS NOT FOUND
                res.send("Could not find your account");
            }
        });

    });

    //Unknown routes
    app.get('*', function (req, res) {
        res.send('ERROR 404 NOT FOUND, NO SUCH PAGE PLS GO BACK TO MAIN PAGE BRUH', 404);
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


