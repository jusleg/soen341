/**
 * Created by Kim on 1/31/2017.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

//Mongoose Schema ==============================================================================

let User = mongoose.Schema({
    validated:Boolean,
    id: String,
    name: String,
    pass: String,
    online: Boolean,
    classUser: [{type: Schema.Types.ObjectId, ref: 'class'}],
    classMod: [{type: Schema.Types.ObjectId, ref: 'class'}],
    role : Number
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


var hashCode = function hashCode(s){
    if(s == null){
        return null;
    }
    let tempString = s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    return tempString;
};

// exports.hashCode = hashCode();
module.expors = {
    hashCode: hashCode
};
module.exports = mongoose.model('User', User);