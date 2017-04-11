'use strict';

var path = require('path');
var User = require('../models/user');
var classroom = require('../models/Classes.js');
var crypto = require('crypto-js');
var parseMePLzr = require('body-parser');
var email = require('./email');
var flash = require('req-flash');
var schedule = require('node-schedule');


module.exports = function (app, passport) {
    app.use(flash());
    var hashCode = function hashCode(s) {
        if (s == null) {
            return null;
        }
        var tempString = s.split("").reduce(function (a, b) {
            a = (a << 5) - a + b.charCodeAt(0);return a & a;
        }, 0);
        return tempString;
    };

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, '../../public/views/landing.html'));
    });

    app.get('/login', function (req, res) {
        var message = "" + req.flash()["message"];
        if (message == 'new-unvalidated') {
            req.flash('message', '');
            res.redirect('/login?m=3');
        } else if (message == 'That email is already taken.') {
            req.flash('message', '');
            res.redirect('/register?m=taken');
        } else if (message == "wrong") {
            req.flash('message', '');
            res.redirect('/login?m=1');
        } else if (message.includes("unvalidated")) {
            var messagePath = "/login?m=" + message;
            req.flash('message', '');
            res.redirect(messagePath);
        } else if (req.isAuthenticated()) {
            res.redirect('/home');
            req.flash('message', '');
        } else {
            res.sendFile(path.join(__dirname, '../../public/views/login.html'));
        }
    });

    app.get('/register', function (req, res) {
        if (req.isAuthenticated()) {
            res.redirect('/home');
        } else {
            res.sendFile(path.join(__dirname, '../../public/views/register.html'));
        }
    });

    app.get('/createclass', function (req, res) {
        if (req.isAuthenticated() && req.user.role == 2) {
            res.sendFile(path.join(__dirname, '../../public/views/create-class.html'));
        } else {
            res.send('You are not authorized to access this page.');
        }
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true,
        session: true
    }));

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/register',
        failureFlash: true
    }));

    // to get the currently logged in user's info
    app.get('/currentUser', isLoggedIn, function (req, res) {
        User.findOne({ "id": req.user.id }).populate('classMod classUser', '-chat').exec(function (err, user) {
            if (err) return handleError(err);
            var data = {
                username: req.user.name,
                email: req.user.id,
                online: req.user.online,
                role: req.user.role,
                classUser: user.classUser,
                classMod: user.classMod
            };
            res.send(data);
        });
    });

    app.get('/logout', function (req, res) {
        User.findOne({ id: req.session.passport.user }, function (err, user) {
            if (user.online = true) {
                console.log('logging out');
                user.online = false;
                user.save();
                req.session.online = false;
            }
        });
        req.logout();
        res.redirect('/');
    });

    app.post('/reset', function (req, res) {
        var token = req.body.token;
        console.log(token);
        var pass = req.body.password;
        pass = hashCode(pass);
        var text = token + " " + pass;
        console.log(text);
        var email = crypto.AES.decrypt(decodeURIComponent(token), "ch3vald3gu3rr3ftwgr8b8m8").toString(crypto.enc.Utf8);
        console.log(email);
        User.findOne({ id: email }, function (err, user) {
            if (err) {
                res.redirect("/?m=3");
                return done(err);
            }
            if (user) {
                user.pass = pass;
                user.save(function (err) {
                    if (err) throw err;
                });
                res.redirect("/?m=1");
            } else {
                res.redirect("/?m=3");
            }
        });
    });

    app.get('/bannedAF/:email/:class', isLoggedIn, function (req, res) {
        var email = req.params.email;
        var room = req.params.class;
        var trueEmail = req.user.id;
        if (email == trueEmail) {
            User.findOne({ id: email }, function (err, user) {
                var classes = user.classUser;
                var index = classes.indexOf(room);
                classes.splice(index, 1);
                user.classUser = classes;
                user.save();
            });
        }
        res.redirect("/?banned=" + room);
    });

    app.get('/emailreset', function (req, res) {
        console.log(req.query.email);
        email.forgotPass(req.query.email);
    });

    app.get('/home', isLoggedIn, function (req, res) {
        var j = schedule.scheduleJob('*14 * * * *', function(){
            User.findOne({ id: req.session.passport.user }, function (err, user) {
                if (user.online = true) {
                    user.online = false;
                    user.save();
                    req.session.online = false;
                }
            });
        });
        res.sendFile(path.join(__dirname, '/../../public/app/app.html'));
    });

    app.get('/resetpassword', function (req, res) {
        res.sendFile(path.join(__dirname, '../../public/views/pass-change.html'));
    });

    app.get('/reverify/:id', function (req, res) {
        email.newAccount(req.params.id);
        res.redirect("/login?m=resent");
    });

    app.get('/verify/:id', function (req, res) {
        var email = crypto.AES.decrypt(decodeURIComponent(req.params.id), "ch3vald3gu3rr3ftwgr8b8m8").toString(crypto.enc.Utf8);
        console.log(email);
        User.findOne({ id: email }, function (err, user) {
            if (err) return done(err);
            if (user) {
                user.validated = true;
                user.save(function (err) {
                    if (err) throw err;
                });
                res.redirect("/?m=4");
            } else {
                res.redirect("/?m=3");
            }
        });
    });

    //Unknown routes
    app.get('*', function (req, res) {
        res.redirect('/?m=404');
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            req.session.online = true;
            return next();
        } else {
            res.redirect('/?m=2');
        }
    };
};
