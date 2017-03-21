const express = require('express')
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage, inMemory: true })

module.exports = function(app) {
	app.post('/createclass', upload.single('studentList'), function(req, res, next) {
		// If file is smaller than 1 MB
		if(req.file.size < 1000000) {
			console.log(req.file.buffer.toString('utf8'));
		}
		else {
			console.error("Attempted file upload exceeded max size of 1 MB: file was " + (req.file.size/1000000).toFixed(2) + " MB.");
		}
	})
};