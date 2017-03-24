const mongoose = require('mongoose'),Schema = mongoose.Schema;

let chatSchema = new Schema({
    _id: String,
    name: String,
    time: String,
    message: String
});

let classSchema = new Schema({
    _id: String,
    active: Boolean,
    time: Date,
    name: String,
    professor: String,
    classroom: String,
    chat: [chatSchema]
},
{
    timestamps: true
});

let Class = mongoose.model('class',classSchema);

module.exports = Class;