var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;

describe('Array', function(done) {
    it('should list ALL quizz', function() {
        chai.request('http://localhost:8000')
            .get('/quizz')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res).to.not.be.empty;
                done;
            });
    });
    it('should return ONE quizz', function () {
        chai.request('http://localhost:8000')
            .get('/quizz/1')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res).to.not.be.empty;
                done;
            });
    });
    it('should list ALL the questions from ONE quizz', function () {
        chai.request('http://localhost:8000')
            .get('/quizz/questions/1')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res).to.not.be.empty;
                done;
            });
    });
    it('should list ALL anwsers from ONE question', function () {
        chai.request('http://localhost:8000')
            .get('/anwser/1')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res).to.not.be.empty;
                done;
            });
    });
    it('should return the score of ONE user', function () {
        chai.request('http://localhost:8000')
            .get('/score/1')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res).to.not.be.empty;
                done;
            });
    });
    it('should edit the score of ONE user', function () {
        chai.request('http://localhost:8000')
            .post('/edit/score/1')
            .end(function (err, res) {
                expect(res).to.have.status(201);
                done;
            });
    });
});
