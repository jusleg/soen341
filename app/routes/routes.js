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
            successRedirect: '/chat',
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

    app.get('/chat', isLoggedIn, function (req, res) {
        res.sendFile(path.join(__dirname, '/../../public/views/classroom.html'));
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}


