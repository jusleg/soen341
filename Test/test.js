/**
 * Created by mike on 2/26/17.
 */

var expect = require('chai').expect;
var assert = require('chai').assert;
let User = require('../app/models/user');
let mailer = require('../app/routes/email.js');
let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://chevaldeguerre.xyz:27017/famongo';


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

describe('A basic test', function () {

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

const _ = require('lodash');
const session = require('supertest-session');
const myApp = require('./../index.js');
var Memcached = require('memcached');
var memcached = new Memcached('localhost:9001', {timeout: 10000});
// var request = require('superagent');


let testSession = null;


describe('Session tests', function(){

    it('Should be able to login successfully with a valid username and password ', function (done){
        testSession.post('/login')
            .send({ email: 'steven1@email.com', password: 'Steven1111' })
            .expect(302)
            .end(done);
    });

    // it('Session should contain Online boolean', function(done){
    //     var sessionCookie = _.find(testSession.cookies, function (cookie) {
    //         return cookie.name === connect.sid;
    //     });
    //
    //     console.log(sessionCookie)
    //     memcached.get(sessionCookie.value, function (err, session) {
    //         console.log(session);
    //         // session.user.name.should.eq('Foobar');
    //         done();
    //     });
    // });

    var authenticatedSession;
    var Cookies;

    beforeEach(function (done) {
        testSession = session(myApp);

        testSession.post('/login')
            .send({ email: 'michel@email.com', password: 'Michel111' })
            .end(function (err, res) {
                if (err) return done(err);
                authenticatedSession = testSession;
                return done();
            });
    });

    it('Online boolean present inside session object', function (done) {

        var req = authenticatedSession.get('/home').expect(200);
        req.cookies = Cookies;
        // console.log(req);
        console.log(req.cookies)

        req
            .end(function(err, res){
                console.log(req.session);
                done();
            });
    });

});

var request = require('supertest');

describe('Session tests2', function(){

    var cookies1;

    it('login', function(done){
        request(myApp)
            .post('/login')
            .send({ email: 'steven1@email.com', password: 'Steven1111' })
            .end(function(err, res){
                cookies1 = res.headers['set-cookie'].pop().split(';')[0];
                console.log(cookies1);
                done();
            })
    }).timeout(5000);

    it('get session', function(done){
        var req = request(myApp).get('/home');
        req.cookies = cookies1;
        // console.log(req);
        // console.log(req.body);
        req
            .end(function(err, res){
            console.log(req)
           done();
        })
    })

});


