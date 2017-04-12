'use strict';

var express = require('express');
var User = require('../models/user.js');
var classroom = require('../models/Classes.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function (app) {
    // get all messages in a class
    app.get('/api/messages/:classId', function (req, res) {
        classroom.find({ '_id': req.params.classId.toUpperCase() }).exec(function (err, data) {
            res.send(data);
        });
    });

    //post data to db
    app.post('/api/message/:classId', function (req, res) {
        var msgObj = req.body;
        var selection = { '_id': req.params.classId.toUpperCase() };
        var updateQuery = { $push: { chat: msgObj } };
        var options = { safe: false, upsert: true };

        classroom.update(selection, updateQuery, options, function (err, data) {
            res.send(data);
        });
    });

    // get all users
    app.get('/api/users', function (req, res) {
        //exclude pass and __v
        User.find({}).select('-pass').select('-__v').exec(function (err, data) {
            res.send(data);
        });
    });

    // get all classrooms
    app.get('/api/classrooms', function (req, res) {
        classroom.find({}).exec(function (err, data) {
            res.send(data);
        });
    });

    var promise1 = User.find({ online: true }).count();
    // get amount of users online
    app.get('/api/getOnlineUsers', function (req, res) {
        promise1.then(function (count) {
            res.send(String(count));
        });
    });

    app.get('/api/test', function (req, res) {
        res.send('You got it');
    });
};