//DB requirements
const mongoose = require('mongoose');
const User = require('../models/user.js');
const classroom = require('../models/Classes.js');

//File upload requirements
const express = require('express');
const multer  = require('multer');
const storage = multer.memoryStorage(); //allows the file to be read into memory instead of saved on disk
const upload = multer({ storage: storage, inMemory: true });

//Mailer
const mailer = require('./email');

module.exports = function(app) {
	app.post('/createclass', upload.single('studentList'), function(req, res) {
		console.log("attempt class creation? (merge with class creation branch)");
		// If file is smaller than 1 MB
		if(req.file.size < 1000000) {

			if(true) {//TODO: if valid class information

				var profEmail = req.user.id;
				var classCode = req.body.classcode;

				// Mongoose users to update or create
				var studentList = req.file.buffer.toString('utf8')
					.split(/[\r\n]+/)
					.map((e) => ({
						email: e.split(',')[0].trim(),
						name: e.split(',')[1].trim(),
						roleInClass: "classUser"
					}));

				var studentEmailList = ((list) => (list.map((e) => e.email)))(studentList);

				var TAs = req.body.TAs
					.split(',')
					.map((e) => ({
						email: e.split(':')[0].trim(),
						name: e.split(':')[1].trim(),
						roleInClass: "classMod"
					}));

				var TAEmailList = ((list) => (list.map((e) => e.email)))(TAs);

				var newClass = new classroom({
					_id:        classCode,
					active:     false,
					name:       req.body.classname,
					professor:  profEmail,
					classroom:  req.body.location
					//TODO: add time
				});

				var newUsers;

				newClass.save((err, classroom) => {
					if(err) console.error(err);
					console.log(classroom);

					User.find({}).exec((err, userList) => {

						var existingStudents = ((list) => list.filter((e) => userExists(e, userList)))(studentEmailList);
						var existingTAs = ((list) => list.filter((e) => userExists(e, userList)))(TAEmailList);
						var mods = existingTAs.concat([profEmail]); // teacher is also to be made a mod

						var studentsToAdd = ((list) => list.filter((e) => !userExists(e.email, userList)))(studentList);
						var TAsToAdd = ((list) => list.filter((e) => !userExists(e.email, userList)))(TAs);

						newUsers = studentsToAdd.concat(TAsToAdd);

						// Add the course code for the students who already have accounts
						var selection = { 'id': { $in: existingStudents } };
						var updateQuery = { $addToSet: { classUser: classroom._id }};
						var options = { safe: true, multi: true };
						User.update(selection, updateQuery, options, function(err, data) {
							console.log(data);
							return data;
						});

						// Add the course code for the moderators-to-be
						var selection = { 'id': { $in: mods } };
						var updateQuery = { $addToSet: { classMod: classroom._id }};
						var options = { safe: true, multi: true };
						User.update(selection, updateQuery, options, function(err, data) {
							console.log(data);
							return data;
						});

						// Create the mentioned users who don't exist yet; add the course code to their relevant list
						for(var i in newUsers) {
							const newUser = new User();

							newUser.id       = newUsers[i].email;
							newUser.pass     = "";
							newUser.name     = newUsers[i].name;
							newUser[newUsers[i].roleInClass].push(classCode); // For mods, pushes to classMod; for students, to classUser

							newUser.save((err) => {
								if (err) throw err;
							});
						}

						function userExists(username, userList) {
							for(var i in userList) {
								if(username === userList[i].id)
									return true; //user found
							}
							return false; //user not found
						}
					})
					.then(() => {
						console.log("and theen");
						var newUserEmails = ((list) => (list.map((e) => e.email)))(newUsers);

						// mailer.newAccount(newUserEmails);
						// mailer.newClass(studentEmailList.concat(TAEmailList));

						res.send("success");
					});
				});
			}
		}
		else {
			console.error("Attempted file upload exceeded max size of 1 MB: file was "
				+ (req.file.size/1000000).toFixed(2) + " MB.");
		}
	})
};
