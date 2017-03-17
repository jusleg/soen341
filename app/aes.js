'use strict';

const CryptoJS = require('crypto-js');
let globalPass = "ch3vald3gu3rr3ftwgr8b8m8";


var Crypto = function() {};

Crypto.prototype.encrypt = (message) => {
    return CryptoJS.AES.encrypt(message, globalPass);
}

Crypto.prototype.decrypt = (message) => {
    return CryptoJS.AES.decrypt(message, globalPass).toString(CryptoJS.enc.Utf8);
}


module.exports = new Crypto();