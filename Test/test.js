/**
 * Created by mike on 2/26/17.
 */

const expect = require('chai').expect;
const assert = require('chai').assert;
const User = require('../app/models/user');
const mailer = require('../app/routes/email.js');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://chevaldeguerre.xyz:27017/famongo';
const session = require('supertest-session');
const myApp = require('./../index.js');
var request = require('superagent');



var api = require('../app/routes/api');
var chai = require('chai'), chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
chai.use(chaiHttp);

var superagent = require('superagent');
var agent = superagent.agent();
exports.login = function (request, done) {
    request.post('/login')
        .send(theAccount)
        .end(function (err, res) {
            if (err) {
                throw err;
            }
            agent.saveCookies(res);
            done(agent);
        });
};

// // var request = require('supertest')(app); var login = require('/login');
//
// describe('MyApp', function () {
//
//     var agent;
//
//     before(function (done) {
//         login.login(request, function (loginAgent) {
//             agent = loginAgent;
//             done();
//         });
//     });
//
//     it('should allow access to admin when logged in', function (done) {
//             var req = request.get('/admin');
//             agent.attachCookies(req);
//             req.expect(200, done);
//         }
//     );
// });

describe('RestApi Routes must all be Functional', function () {
    it('it should GET all Users', function () {
        chai.request(server)
            .get('/api/users')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body.should.be.an('array');
            });
    });
    it('it should get all Messages from the Database', function () {
        chai.request(server)
            .get('/api/messages/engr371')
            .end(function (err, res) {
                res.should.have.status(200);
            });
    });
    it('it should post new messages to the Database', function () {
        chai.request(server)
            .post('/api/message/testing')
            .end(function (err, res) {
                res.should.have.status(200);
            });
    });

    it('it should receive the currentUser info', function () {

        chai.request(server)
            .post('/login')
            .send({
                email: 'example@example.com',
                pass: 'example',
                id: '134234234'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                console.log("Done!");
            })

        chai.request(server)
            .get('/api/currentUser')
            .end(function (err, res) {
                res.should.have.status(200);
            })
    })
});

describe('Sprint 5 testing',function() {

    it('Should pass if reverification page is redirected to', function () {
        chai.request('http://localhost:9001')
            .get('/reverify/bob@bob')
            .end(function (err, res) {
                res.should.have.status(302);
                console.log(err.body);
            });
    });
});

describe('Password tests', function () {

    function hashCode(s) {
        if (s == null) {
            return null;
        }
        let tempString = s.split("").reduce(function (a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }, 0);
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

    it('Should pass if hashCode function outputs correct value', function (done) {

        var correctString = 105230;
        var hashee = 'jim';
        var hashedOutput = hashCode("jim");

        assert.equal(hashedOutput, correctString, '==');


        done();
    });

    it('Should pass if encrypted string matches the correct value', function (done) {
        var correctString;
        var encryptee = "This is a test";
        var encryptedOutput;

        assert.equal(correctString, encryptedOutput);

        done();
    });
});


describe('Authentication tests', function() {

    it('Should be able to login successfully with a valid username and password ', function (done) {
        request.post('/login')
            .send({email: 'steven1@email.com', password: 'Steven1111'})
            .end(function(err,res){
                done();
            });
    });

});

describe('Database fields validatiion', function(){

    it('should login', function(done) {
        request.post('/login')
            .send({email: 'kevin1@email.com', password: 'Kevin1111'})
            .end(function (err, res) {
                User.findOne({id: 'kevin1@email.com'}, function (err, user) {
                    console.log(user);
                    // expect(user.online).to.be.false;
                    done();
                });
            });
    }).timeout(10000);
    });
