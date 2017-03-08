/**
 * Created by mike on 2/26/17.
 */

var expect = require('chai').expect;
var assert = require('chai').assert;
let User = require('../app/models/user');
let mailer = require('../app/routes/email.js');
let MongoClient = require('mongodb').MongoClient
let url = 'mongodb://chevaldeguerre.xyz:27017/famongo';

var api = require('../app/routes/api');
var chai = require('chai'), chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
chai.use(chaiHttp);

describe('RestApi Routes must all be Functional', function() {
    it('it should GET all Users', function() {
        chai.request(server)
            .get('/api/users')
            .end(function(err, res){
                res.should.have.status(200);
                res.body.should.be.an('array');
            });
    });
    it('it should get all Messages from the Database', function() {
        chai.request(server)
            .get('/api/messages/engr371')
            .end(function(err, res){
                res.should.have.status(200);
            });
    });
    it('it should post new messages to the Database', function() {
        chai.request(server)
            .post('/api/message/testing')
            .end(function(err, res){
                res.should.have.status(200);
            });
    });
});

describe('A basic test',function(){

    function hashCode(s){
        if(s == null){
            return null;
        }
        let tempString = s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        return tempString;
    };

    // it('Should pass if value within database is the same as hashed value',function(done){
    //
    //     var pass = "TestPass";
    //     var user = new User();
    //     var hashedResult = hashCode(pass);
    //
    //     user.pass = user.generateHash(pass);
    //     user.name = "JIm";
    //     user.id = ("kimthong@example.com");
    //
    //     user.save((err) => {
    //         if (err)
    //             throw err;
    //         else{
    //             console.log("Saved");
    //         }
    //     });
    //     User.findOne({ id :  "Timorthy@example.com" }, (err, queriedUser) => {
    //         if (err)
    //             return done(err);
    //         if (queriedUser) {
    //             console.log(queriedUser.pass + queriedUser.name);
    //             assert.equals("hashedResult", queriedUser.pass);
    //             done();
    //         }
    //     });
    //
    // }).timeout(50000);

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
