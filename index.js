'use strict';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const logger = require('morgan');
const session = require('express-session');
const api = require('./app/routes/api');
const flash = require('connect-flash');
const db = require('./config/db.js');
const cookieParser = require('cookie-parser');


mongoose.Promise = global.Promise;
mongoose.connect(db.uri);
require('./config/passport')(passport);


//Middlewares
//in order to parse body responses
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//to log sever connections
app.use(logger('dev'));
// set the static files location /public/img will be /img for us
app.use(express.static(__dirname + '/public'));
//serve bower components
app.use('/bower_components', express.static(__dirname + '/bower_components'));
// for cookies (for authentication)
app.use(cookieParser());

//Passport authentication middlewares
app.use(session({ secret: 'Harambe2k17HowBouDah' }));
app.use(passport.initialize());
app.use(passport.session());
// to have a flash message for login/register
app.use(flash());

//Routes
require('./app/routes/routes.js')(app, passport);

//Api routes
require('./app/routes/api.js')(app);
// app.use('/api', api);



io.on('connection', function (socket) {
    //user is connected...
    console.log("A User connected");
    //join a room
    socket.on('join room', function(room) {
        console.log('joining room', room);
        socket.join(room);
    });
    //leave a room
    socket.on('leave room', function(room) {
        console.log('leaving room', room);
        socket.leave(room);
    });
    //when user sends a message
    socket.on('userMessage', function (msg) {
        var room = msg.class;
        console.log('message sent to: ' + room);
        io.emit(room, msg);
    });

    //when user leaves, do something
    socket.on('disconnect', function () {
        console.log('user disconnected')
    });
});


http.listen(9001, function () {
    console.log('listening on*: 9001');
});

module.exports = app; // for testing
