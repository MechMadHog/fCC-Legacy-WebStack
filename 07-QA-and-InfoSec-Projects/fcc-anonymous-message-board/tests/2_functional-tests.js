'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;
chai.use(chaiHttp);

suite('Functional Tests', function () {
  const board = 'fcc-test-board';
  let threadId;
  let replyId;

  test('Creating a new thread: POST request to /api/threads/{board}', function (done) {
    chai.request(server).post('/api/threads/' + board).send({ text: 'test thread', delete_password: 'secret' }).end((err, res) => {
      assert.equal(res.status, 200); assert.equal(res.body.text, 'test thread'); assert.isString(res.body._id);
      threadId = res.body._id; done();
    });
  });

  test('Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}', function (done) {
    chai.request(server).get('/api/threads/' + board).end((err, res) => {
      assert.equal(res.status, 200); assert.isArray(res.body); assert.isAtMost(res.body.length, 10);
      assert.notProperty(res.body[0], 'delete_password'); assert.notProperty(res.body[0], 'reported'); done();
    });
  });

  test('Deleting a thread with the incorrect password: DELETE request to /api/threads/{board}', function (done) {
    chai.request(server).delete('/api/threads/' + board).send({ thread_id: threadId, delete_password: 'wrong' }).end((err, res) => {
      assert.equal(res.text, 'incorrect password'); done();
    });
  });

  test('Reporting a thread: PUT request to /api/threads/{board}', function (done) {
    chai.request(server).put('/api/threads/' + board).send({ thread_id: threadId }).end((err, res) => {
      assert.equal(res.text, 'reported'); done();
    });
  });

  test('Creating a new reply: POST request to /api/replies/{board}', function (done) {
    chai.request(server).post('/api/replies/' + board).send({ thread_id: threadId, text: 'test reply', delete_password: 'replypass' }).end((err, res) => {
      assert.equal(res.status, 200); assert.isArray(res.body.replies); replyId = res.body.replies[0]._id; done();
    });
  });

  test('Viewing a single thread with all replies: GET request to /api/replies/{board}', function (done) {
    chai.request(server).get('/api/replies/' + board).query({ thread_id: threadId }).end((err, res) => {
      assert.equal(res.status, 200); assert.equal(res.body._id, threadId); assert.notProperty(res.body, 'delete_password');
      assert.notProperty(res.body, 'reported'); assert.notProperty(res.body.replies[0], 'delete_password'); done();
    });
  });

  test('Deleting a reply with the incorrect password: DELETE request to /api/replies/{board}', function (done) {
    chai.request(server).delete('/api/replies/' + board).send({ thread_id: threadId, reply_id: replyId, delete_password: 'wrong' }).end((err, res) => {
      assert.equal(res.text, 'incorrect password'); done();
    });
  });

  test('Reporting a reply: PUT request to /api/replies/{board}', function (done) {
    chai.request(server).put('/api/replies/' + board).send({ thread_id: threadId, reply_id: replyId }).end((err, res) => {
      assert.equal(res.text, 'reported'); done();
    });
  });

  test('Deleting a reply with the correct password: DELETE request to /api/replies/{board}', function (done) {
    chai.request(server).delete('/api/replies/' + board).send({ thread_id: threadId, reply_id: replyId, delete_password: 'replypass' }).end((err, res) => {
      assert.equal(res.text, 'success'); done();
    });
  });

  test('Deleting a thread with the correct password: DELETE request to /api/threads/{board}', function (done) {
    chai.request(server).delete('/api/threads/' + board).send({ thread_id: threadId, delete_password: 'secret' }).end((err, res) => {
      assert.equal(res.text, 'success'); done();
    });
  });
});
