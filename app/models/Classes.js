const mongoose = require('mongoose'),Schema =
    mongoose.Schema;

let chatSchema = new Schema({
    id: String,
    name: String,
    time: Date,
    message: String
});

let classSchema = new Schema({
    id: String,
    active: Boolean,
    time: Date,
    name: String,
    professor: String,
    classroom: String,
    chat: [chatSchema]
});

let Class = mongoose.model('classRoom',classSchema);

module.exports = Class;