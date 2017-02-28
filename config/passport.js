const LocalStrategy   = require('passport-local').Strategy;
const User = require('../app/models/user');


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
                }
                user.online = true;
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
                        newUser.name = req.body.name;
                        newUser.save((err) => {
                            if (err)
                                throw err;
                            done(null, newUser);
                        });

                    }
                });
            });
        }));




};