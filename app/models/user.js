/**
 * Created by Kim on 1/31/2017.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Mongoose Schema ==============================================================================

let User = mongoose.Schema({
    id: String,
    name: String,
    pass: String,
    online: Boolean,
    classUser: [String],
    classMod: [String]
});

// Schema methods ==============================================================================
// Generate password hash
User.methods.generateHash = (password) => {
    var hashedPassword = hashCode(password);
    return hashedPassword;
};

// Validate password
User.methods.validPassword = function(password) {
    var hashedPass = hashCode(password);
    if(this.pass == hashedPass){
        return true;
    } else {
        return false;
    }
};


var hashCode = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
}


module.exports = mongoose.model('User', User);