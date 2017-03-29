let LocalStrategy   = require('passport-local').Strategy;
let User = require('../app/models/user');
let mailer = require('../app/routes/email');
let crypto = require('crypto-js');


module.exports = function(passport) {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({id:id}, (err, user) => {
            done(err, user);
        });
    });


    //Login
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User.findOne({id: email}, (err, user) => {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Invalid password.'));
                } else{
                    user.online = true;
                    user.save((err) => {
                        if (err)
                            throw err;
                        done(null, user);
                    });
                }
                return done(null, user);
            });
        }
    ));


    //Register
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        (req, email, password, done) => {
            process.nextTick(() => {
                User.findOne({ id :  email }, (err, user) => {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        const newUser = new User();
                        newUser.id = email;
                        newUser.pass = newUser.generateHash(password);
                        newUser.imglink = "https://www.gravatar.com/avatar/"+crypto.MD5(email.trim().toLowerCase()).toString()+"?d=retro";
                        newUser.name = req.body.name;
                        newUser.validated = false;
                        newUser.save((err) => {
                            if (err)
                                throw err;
                            done(null, newUser);
                        });
                        mailer.newAccount(newUser.id);
                    }
                });
            });
        }));




};