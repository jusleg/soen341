const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const classroom = require('../models/Classes.js');

// get all todos
router.get('/messages/:classId', function(req, res) {
    classroom.find().exec(function(err,data){
        res.send({'data' : data})
    });
});

// create
router.get('/allUsers', function(req, res) {
    //exclude pass and __v
    User.find({}).select('-pass').select('-__v').exec(function(err,data){
        res.send({'data':data})
    });
});


module.exports = router;