const express = require('express');
const router = express.Router();

// get all todos
router.get('/todos', function(req, res) {

});

// create todo and send back all todos after creation
router.post('/todos', function(req, res) {

});

// delete a todo
router.delete('/todos/:todo_id', function(req, res) {

});

module.exports = router;