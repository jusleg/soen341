'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var logger = require('morgan');
var session = require('express-session');
var api = require('./app/routes/api');
var flash = require('req-flash');
var db = require('./config/db.js');
var cookieParser = require('cookie-parser');

mongoose.Promise = global.Promise;
mongoose.connect(db.uri, { auth: { authdb: "admin" } });
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

//Passport authentication middlewares, Cookie expires after 15min
+app.use(session({ secret: 'Harambe2k17HowBouDah', cookie: { maxAge: 900000 } }));
app.use(passport.initialize());
app.use(passport.session());
// to have a flash message for login/register
app.use(flash());

//Api routes
require('./app/routes/api.js')(app);
// app.use('/api', api);

//Routes
require('./app/routes/routes.js')(app, passport);

//File upload
require('./app/routes/file-upload.js')(app);

io.on('connection', function (socket) {
    //user is connected...
    console.log("A User connected");
    //join a room
    socket.on('join room', function (room) {
        console.log('joining room', room);
        socket.join(room);
    });
    //leave a room
    socket.on('leave room', function (room) {
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
        console.log('user disconnected');
    });
});

http.listen(9001, function () {
    console.log('listening on*: 9001');
});

module.exports = app;