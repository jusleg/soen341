/**
 * Created by mike on 2/26/17.
 */

var expect = require('chai').expect;
var assert = require('chai').assert;
let User = require('../app/models/user');
let mailer = require('../app/routes/email');

describe('A basic test',function(done){
    it('Function done',function(){
        var pass = "TestPass";
        var user = new User();
        var hashedResult = User.hashCode("sdfsdfdsf");

        user.pass = pass;
        user.name = "JIm";
        user.id("Timorthy@example.com");

        user.save((err) => {
            if (err)
                throw err;
            done(null, user);
        });

        var userInDb;
        User.findOne({ id :  "Timorthy@example.com" }, (err, user) => {
            if (err)
                return done(err);
            if (user) {
                userInDb = user;
            }
        });

        assert.equals("hashedResult",userInDb.pass);
        done();
    })

})

