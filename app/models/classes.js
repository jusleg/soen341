'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var chatSchema = new Schema({
    _id: String,
    name: String,
    time: String,
    message: String,
    imglink: String
});

var classSchema = new Schema({
    _id: String,
    active: Boolean,
    time: Date,
    name: String,
    professor: String,
    classroom: String,
    chat: [chatSchema]
}, {
    timestamps: true
});

var Class = mongoose.model('class', classSchema);

module.exports = Class;
