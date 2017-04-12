'use strict';

//DB requirements
var mongoose = require('mongoose');
var User = require('../models/user.js');
var classroom = require('../models/Classes.js');

//File upload requirements
var express = require('express');
var multer = require('multer');
var storage = multer.memoryStorage(); //allows the file to be read into memory instead of saved on disk
var upload = multer({ storage: storage, inMemory: true });

//Mailer
var mailer = require('./email');

module.exports = function (app) {

    app.post('/createclass', upload.single('studentList'), function (req, res) {
        // If file is smaller than 1 MB
        if (req.file.size < 1000000) {
            var classAlreadyExists = false; // Set to true if found in query
            var classCode = req.body.classcode; // The code of the class to create

            classroom.find({}).exec(function (err, classList) {
                for(var i in classList) {
                    if(classList[i]._id === classCode) {
                        classAlreadyExists = true;
                    }
                }
            }).then(function () {
                if(classAlreadyExists) {
                    res.send('Error: Class already exists.');
                } else {
                    var profEmail = req.user.id;

                    // Mongoose users to update or create
                    var studentList = req.file.buffer.toString('utf8').split(/[\r\n]+/).map(function (e) {
                        return {
                            email: e.split(',')[0].trim(),
                            name: e.split(',')[1].trim(),
                            roleInClass: "classUser"
                        };
                    });

                    var studentEmailList = function (list) {
                        return list.map(function (e) {
                            return e.email;
                        });
                    }(studentList);

                    var TAs = req.body.TAs.split(',').map(function (e) {
                        return {
                            email: e.split(':')[0].trim(),
                            name: e.split(':')[1].trim(),
                            roleInClass: "classMod"
                        };
                    });

                    var TAEmailList = function (list) {
                        return list.map(function (e) {
                            return e.email;
                        });
                    }(TAs);

                    var now = Date.now();

                    var newClass = new classroom({
                        _id: classCode,
                        active: false,
                        name: req.body.classname,
                        professor: profEmail,
                        classroom: req.body.location,
                        createdAt: now,
                        updatedAt: now
                    });

                    var newUsers;

                    newClass.save(function (err, classroom) {
                        if (err) console.error(err);
                        console.log(classroom);

                        User.find({}).exec(function (err, userList) {

                            var existingStudents = function (list) {
                                return list.filter(function (e) {
                                    return userExists(e, userList);
                                });
                            }(studentEmailList);
                            var existingTAs = function (list) {
                                return list.filter(function (e) {
                                    return userExists(e, userList);
                                });
                            }(TAEmailList);
                            var mods = existingTAs.concat([profEmail]); // teacher is also to be made a mod

                            var studentsToAdd = function (list) {
                                return list.filter(function (e) {
                                    return !userExists(e.email, userList);
                                });
                            }(studentList);
                            var TAsToAdd = function (list) {
                                return list.filter(function (e) {
                                    return !userExists(e.email, userList);
                                });
                            }(TAs);

                            newUsers = studentsToAdd.concat(TAsToAdd);

                            // Add the course code for the students who already have accounts
                            var selection = { 'id': { $in: existingStudents } };
                            var updateQuery = { $addToSet: { classUser: classroom._id } };
                            var options = { safe: true, multi: true };
                            User.update(selection, updateQuery, options, function (err, data) {
                                console.log(data);
                                return data;
                            });

                            // Add the course code for the moderators-to-be
                            var selection = { 'id': { $in: mods } };
                            var updateQuery = { $addToSet: { classMod: classroom._id } };
                            var options = { safe: true, multi: true };
                            User.update(selection, updateQuery, options, function (err, data) {
                                console.log(data);
                                return data;
                            });

                            // Create the mentioned users who don't exist yet; add the course code to their relevant list
                            for (var i in newUsers) {
                                var newUser = new User();

                                newUser.id = newUsers[i].email;
                                newUser.pass = "";
                                newUser.name = newUsers[i].name;
                                newUser[newUsers[i].roleInClass].push(classCode); // For mods, pushes to classMod; for students, to classUser

                                newUser.save(function (err) {
                                    if (err) throw err;
                                });
                            }

                            function userExists(username, userList) {
                                for (var i in userList) {
                                    if (username === userList[i].id) return true; //user found
                                }
                                return false; //user not found
                            }
                        }).then(function () {
                            var newUserEmails = function (list) {
                                return list.map(function (e) {
                                    return e.email;
                                });
                            }(newUsers);
                            res.send("success");
                        });
                    });
                }
            });
        } else {
            console.error("Attempted file upload exceeded max size of 1 MB: file was " + (req.file.size / 1000000).toFixed(2) + " MB.");
        }
    });
};