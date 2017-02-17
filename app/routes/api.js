const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const classroom = require('../models/Classes.js');

// get all messages in a class
router.get('/messages/:classId', function(req, res) {
    classroom.find({'_id': req.params.classId.toUpperCase()}).exec(function(err,data){
        res.send(data)
    });
});

//post data to db
router.post('/message/:classId',function(req,res){

})

// get all users
router.get('/allUsers', function(req, res) {
    //exclude pass and __v
    User.find({}).select('-pass').select('-__v').exec(function(err,data){
        res.send(data)
    });
});


module.exports = router;