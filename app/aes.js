'use strict';

var CryptoJS = require('crypto-js');
var globalPass = "ch3vald3gu3rr3ftwgr8b8m8";

var Crypto = function Crypto() {};

Crypto.prototype.encrypt = function (message) {
    return CryptoJS.AES.encrypt(message, globalPass);
};

Crypto.prototype.decrypt = function (message) {
    return CryptoJS.AES.decrypt(message, globalPass).toString(CryptoJS.enc.Utf8);
};

module.exports = new Crypto();