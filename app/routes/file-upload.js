const express = require('express')
const multer  = require('multer')
// var storage = multer.memoryStorage()
// var upload = multer({ storage: storage })
const upload = multer({ dest: 'uploads/' })

module.exports = function(app) {
	app.post('/createclass', upload.single('studentList')/*, function(req, res, next) {
		// If file is smaller than 1 MB
		if(req.file.size < 1000000) {
			;
		}
		else {
			console.error("Attempted file upload exceeded max size of 1 MB: file was " + (req.file.size/1000000).toFixed(2) + " MB.");
		}
	}*/)
};