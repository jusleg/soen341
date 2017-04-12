'use strict';

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');
var mailer = require('../app/routes/email');
var crypto = require('crypto-js');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({ id: id }, function (err, user) {
            done(err, user);
        });
    });

    //Login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOne({ id: email }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, req.flash('message', 'wrong'));
            }
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('message', 'wrong'));
            } else {
                user.online = true;
                user.save(function (err) {
                    if (err) throw err;
                    done(null, user);
                });
            }
            if (!user.checkValidated()) {
                return done(null, false, req.flash('message', 'unvalidated&email=' + email));
            }
            return done(null, user);
        });
    }));

    //Register
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        process.nextTick(function () {
            User.findOne({ id: email }, function (err, user) {
                if (err) return done(err);
                if (user) {
                    return done(null, false, req.flash('message', 'That email is already taken.'));
                } else {
                    var newUser = new User();
                    newUser.id = email;
                    newUser.pass = newUser.generateHash(password);
                    newUser.imglink = "https://www.gravatar.com/avatar/" + crypto.MD5(email.trim().toLowerCase()).toString() + "?d=retro";
                    newUser.name = req.body.name;
                    newUser.validated = false;
                    newUser.save(function (err) {
                        if (err) throw err;
                        done(null, newUser);
                    });
                    mailer.newAccount(email);
                    return done(null, false, req.flash('message', 'new-unvalidated'));
                }
            });
        });
    }));
};