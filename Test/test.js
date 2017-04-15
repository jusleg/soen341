'use strict';

/**
 * Created by mike on 2/26/17.
 */

var expect = require('chai').expect;
var assert = require('chai').assert;
var User = require('../app/models/user');
var mailer = require('../app/routes/email.js');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://chevaldeguerre.xyz:27017/famongo';
var session = require('supertest-session');
var myApp = require('./../index.js');
var request = require('superagent');
var crypto = require('crypto-js');

var api = require('../app/routes/api');
var chai = require('chai'),
    chaiHttp = require('chai-http');
var server = require('../index.js');
var should = chai.should();
chai.use(chaiHttp);

var superagent = require('superagent');
var agent = superagent.agent();
exports.login = function (request, done) {
    request.post('/login').send(theAccount).end(function (err, res) {
        if (err) {
            throw err;
        }
        agent.saveCookies(res);
        done(agent);
    });
};


describe('RestApi Routes must all be Functional', function () {
    it('it should GET all Users', function () {
        chai.request(server).get('/api/users').end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.an('array');
        });
    });
    it('it should get all Messages from the Database', function () {
        chai.request(server).get('/api/messages/engr371').end(function (err, res) {
            res.should.have.status(200);
        });
    });
    it('it should post new messages to the Database', function () {
        chai.request(server).post('/api/message/testing').end(function (err, res) {
            res.should.have.status(200);
        });
    });

    it('it should receive the currentUser info', function () {

        chai.request(server).post('/login').send({
            email: 'example@example.com',
            pass: 'example',
            id: '134234234'
        }).end(function (err, res) {
            res.should.have.status(200);
            console.log("Done!");
        });

        chai.request(server).get('/api/currentUser').end(function (err, res) {
            res.should.have.status(200);
        });
    });
});

describe('Sprint 5 testing', function () {

    it('Should pass if reverification page is redirected to', function () {
        chai.request('http://localhost:9001').get('/reverify/steven@hotmail.com').end(function (err, res) {
            res.should.have.status(302);
            console.log(err.body);
        });
    });

    it('Should match with regex if email is valid',function(){
        var email = "email@hotmail.com";
        var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm;

        var badEmail = "asidjasdasd$#424245$525";

        //assert(regex.exec(email),'Good email!');
        //assert.isNotOk(regex.exec(badEmail),'Bad Email!');
    });
});

describe('Password tests', function () {

    function hashCode(s) {
        if (s == null) {
            return null;
        }
        var tempString = s.split("").reduce(function (a, b) {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
        }, 0);
        return tempString;
    };


    it('Should pass if hashCode function outputs correct value', function (done) {

        var correctString = 105230;
        var hashee = 'jim';
        var hashedOutput = hashCode("jim");

        assert.equal(hashedOutput, correctString, '==');

        done();
    });

    it('Should pass if encrypted string matches the correct value', function (done) {
        var encryptee = "This is a test";
        var encryptedOutput = encodeURIComponent(crypto.AES.encrypt(encryptee, "ch3vald3gu3rr3ftwgr8b8m8").toString());
        var decryptedOutput = crypto.AES.decrypt(decodeURIComponent(encryptedOutput), "ch3vald3gu3rr3ftwgr8b8m8").toString(crypto.enc.Utf8);

        assert.equal(encryptee, decryptedOutput);

        done();
    });
});

describe('Authentication tests', function () {

    it('Should be able to login successfully with a valid username and password ', function (done) {
        request.post('/login').send({ email: 'steven1@email.com', password: 'Steven1111' }).end(function (err, res) {
            done();
        });
    });
});


describe('Database fields validatiion', function () {

    it('should login', function (done) {
        request.post('/login').send({ email: 'kevin1@email.com', password: 'Kevin1111' }).end(function (err, res) {
            User.findOne({ id: 'kevin1@email.com' }, function (err, user) {
                console.log(user);
                // expect(user.online).to.be.false;
                done();
            });
        });
    }).timeout(10000);
});
