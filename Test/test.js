/**
 * Created by mike on 2/26/17.
 */

var expect = require('chai').expect;
var assert = require('chai').assert;
let User = require('../app/models/user');
let mailer = require('../app/routes/email.js');

describe('A basic test',function(){

    function hashCode(s){
        if(s == null){
            return null;
        }
        let tempString = s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        return tempString;
    };

    xit('Should pass if value within databse is the same as hashed value',function(done){
        var pass = "TestPass";
        var user = new User();
        var hashedResult = hashCode("sdfsdfdsf");

        user.pass = pass;
        user.name = "JIm";
        user.id = ("Timorthy@example.com");

        user.save((err) => {
            if (err)
                throw err;
            done(null, user);
        });

        User.findOne({ id :  "jimothy@example.com" }, (err, user) => {
            console.log('enter');
            if (err)
                return done(err);
            if (user) {
                console.log(user.pass);
                assert.equals("hashedResult",user.pass);
                done();
            }
        });

    })

        it('Should pass if hashCode function outputs correct value',function(done){

            var correctString = 105230;
            var hashee = 'jim';
            var hashedOutput = hashCode("jim");

            assert.equal(hashedOutput,correctString,'==');


            done();
        })

        it('Should pass if encrypted string matches the correct value',function(done){
            var correctString;
            var encryptee = "This is a test";
            var encryptedOutput;

            assert.equal(correctString,encryptedOutput);

            done();
        })






});
