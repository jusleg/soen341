var mongoose = require('mongoose'),Schema =
    mongoose.Schema;

mongoose.connect('mongodb://138.197.138.222:27017/famongo');

var chatSchema = new Schema({
    name: String,
    time: Date,
    message: String
});

var classSchema = new Schema({
active: Boolean,
time: Date,
name: String,
professor: String,
classroom: String,
chat: [chatSchema]
});

var Class = mongoose.model('classRoom',classSchema);

