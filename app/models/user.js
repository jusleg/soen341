'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

//Mongoose Schema ==============================================================================

var User = mongoose.Schema({
    validated: Boolean,
    imglink: String,
    id: String,
    name: String,
    pass: String,
    online: { type: Boolean, default: false },
    role: { type: Number, default: 0 },
    classUser: [{ type: String, ref: 'class' }],
    classMod: [{ type: String, ref: 'class' }]
});

// Schema methods ==============================================================================
// Generate password hash
User.methods.generateHash = function (password) {
    var hashedPassword = hashCode(password);
    return hashedPassword;
};

// Validate password
User.methods.validPassword = function (password) {
    var hashedPass = hashCode(password);
    if (this.pass == hashedPass) {
        return true;
    } else {
        return false;
    }
};

User.methods.checkValidated = function () {
    if (this.validated == true) {
        return true;
    } else {
        return false;
    }
};

var hashCode = function hashCode(s) {
    if (s == null) {
        return null;
    }
    var tempString = s.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);return a & a;
    }, 0);
    return tempString;
};

// exports.hashCode = hashCode();
module.expors = {
    hashCode: hashCode
};
module.exports = mongoose.model('User', User);