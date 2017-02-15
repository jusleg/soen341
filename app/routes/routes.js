/**
 * Created by Kim on 1/31/2017.
 */
'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/views/landing.html'));
});

router.get('/login', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/views/login.html'));
});

router.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/views/register.html'));
});

passport.use(new LocalStrategy(
    function(email, password, done) {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            //if(user.getPassword == password){
            // return done(null, false, { message: 'Incorrect password.' });
            return done(null, user);
        });
    }
));

router.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })
);

router.get('/chat', function(req,res) {
    res.sendFile(path.join(__dirname, '/../../public/views/classroom.html'));
});

module.exports = router;
