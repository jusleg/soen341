/**
 * Created by mike on 2/26/17.
 */

var expect = require('chai').expect;
var assert = require('chai').assert;
let User = require('../app/models/user');
let mailer = require('../app/routes/email.js');
let MongoClient = require('mongodb').MongoClient
let url = 'mongodb://chevaldeguerre.xyz:27017/famongo';

describe('A basic test',function(){

    function hashCode(s){
        if(s == null){
            return null;
        }
        let tempString = s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        return tempString;
    };

    it('Should pass if value within databse is the same as hashed value',function(done){
        console.log("in");

        var pass = "TestPass";
        var user = new User();
        var hashedResult = hashCode(pass);

        user.pass = user.generateHash(pass);
        user.name = "JIm";
        user.id = ("kimthong@example.com");

        user.save((err) => {
            if (err)
                throw err;
            else{
                console.log("Saved");
            }
        });

        console.log("in");

        console.log(User.find({}));

        User.findOne({ id :  "Timorthy@example.com" }, (err, queriedUser) => {
            console.log('enter');
            if (err)
                return done(err);
            if (queriedUser) {
                console.log(queriedUser.pass + queriedUser.name);
                assert.equals("hashedResult", queriedUser.pass);
                done();
            }
        });

    }).timeout(50000);

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
