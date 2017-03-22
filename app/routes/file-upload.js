//DB requirements
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
		// If file is smaller than 1 MB
		if(req.file.size < 1000000) {

			if(true) {//TODO: if valid class information

				var newClass = new classroom({
					_id:       req.body.classcode,
					active:    false,
					name:      req.body.classname,
					professor: req.user.id,
					classroom: req.body.location
					//TODO: add time
				});

				newClass.save(function(err, data) {
					if(err) console.error(err);
					console.log(data);
				});

				// Mongoose users to update or create
				var studentList = req.file.buffer.toString('utf8')
					.split(/[\r\n]+/)
					.map((e) => (e.trim())); //get students file as array of lines, trim whitespace

				var mods = req.body.TAs
					.split(',')
					.map((e) => (e.trim())); //get each TA'split email and trim each one's whitespace
				mods.push(req.user.email); //teacher should also be a moderator

				getUsers().then(function(userList) {

					let newUsers = [];
					let usersInClass = [];

					// Add course code to courseMod for users who are to be TAs for this course
					for(var i in mods) {
						usersInClass.push(mods[i][0]);
						if(userExists(mods[i][0], userList)) {
							var selection = { 'id': mods[i][0] };
							var updateQuery = { $addToSet: { classMod: req.body.classcode }};
							var otions = { safe: true, upsert: true };
							User.update(selection, updateQuery, options, function(err, data) {
								console.log(data);
							})
						}
						else {
							console.log('candidate TA ' + mods[i][0] + ' not found in existing user list');

							//Create new account for TA
							let newUser = new User({
								id:   mods[i][0],
								pass: "",
								name: mods[i][1],
							});

							newUser.save((err) => {
								if (err) throw err;
								done(null, newUser);
							});
							newUsers.push(newUser.id);
						}
					}

					for(var i in studentList) {
						let studentInfo = studentList[i].split(','); //[0]==email,[1]==name
						usersInClass.push(studentInfo[0]);

						if(userExists(studentInfo[0], userList)) {
							var selection = {'id': studentInfo[0]};
							var updateQuery = { $addToSet: { classUser: req.body.classcode }}
							var options = { safe: true, upsert: true };
							User.update(selection, updateQuery, options, function(err, data) {
								console.log(data);
							});
						}
						else {
							console.log('student ' + studentInfo[0] + ' not found in existing user list');

							//Create new account for student
							let newUser = new User({
								id:   studentInfo[i][0],
								pass: "",
								name: studentInfo[i][1],
							});

							newUser.save((err) => {
								if (err) throw err;
								done(null, newUser);
							});
							newUsers.push(newUser.id);
						}
					}

					mailer.newAccount(newUsers);
					mailer.newClass(usersInClass); // TODO: cause it to not email the teacher who created the class?
				});
			}
		}	
		else {
			console.error("Attempted file upload exceeded max size of 1 MB: file was "
				+ (req.file.size/1000000).toFixed(2) + " MB.");
		}
	})

	function getUsers() {
		return User.find({}).select('-pass').select('-__v').exec();
	}

	function userExists(username, userList) {
		for(var i in userList) {
			if(username === userList[i].id)
				return true; //user found
		}
		return false; //user not found
	}
};
