const express = require('express');
const User = require('../models/user.js');
const classroom = require('../models/Classes.js');

module.exports = function(app) {
    // get all messages in a class
    app.get('/api/messages/:classId', function(req, res) {
        classroom.find({'_id': req.params.classId.toUpperCase()}).exec(function(err,data){
            res.send(data)
        });
    });

    //post data to db
    app.post('/api/message/:classId',function(req,res){
        var msgObj = req.body;
        var selection = {'_id': req.params.classId.toUpperCase()};
        var updateQuery = { $push: { chat: msgObj} };
        var options = { safe: true, upsert: true };

        classroom.update(selection, updateQuery, options, function(err,data){
            res.send(data);
        })

    });

    // get all users
    app.get('/api/users', function(req, res) {
        //exclude pass and __v
        User.find({}).select('-pass').select('-__v').exec(function(err,data){
            res.send(data)
        });
    });

    app.get('/api/test',function(req,res){
        res.send('You got it');
    })
};
