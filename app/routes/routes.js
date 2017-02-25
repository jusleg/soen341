/**
 * Created by Kim on 1/31/2017.
 */
'use strict';
const path = require('path');


module.exports = function(app, passport) {


    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/views/landing.html'));
    });

    app.get('/login', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/views/login.html'));
    });

    app.get('/register', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/views/register.html'));
    });

    app.post('/login',
        passport.authenticate('local-login', {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true,
            session: false
        }));

    app.post('/register',
        passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/register',
            failureFlash: true,
            session: false
        }));

    app.get('/home', isLoggedIn, function (req, res) {
        res.sendFile(path.join(__dirname, '/../../public/app/app.html'));
    });

    app.get('/resetpassword', function (req, res) {
        res.sendFile(path.join(__dirname, '../../public/views/pass-change.html'));
    });

};


function isLoggedIn(req, res, next) {
    // console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        this.user.online = true;
        return next();
    }
    return next(); //temporary here so that a user can be redirected to the /home, will need to implement req.login() in sprint3
}

function loggedIn(req, res, next) {
    if (req.user) {
        this.user.online = true;
        next();
    } else {
        res.redirect('/login');
    }
}


