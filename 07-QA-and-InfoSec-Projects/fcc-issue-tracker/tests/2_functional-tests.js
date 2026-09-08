const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  const project = 'apitest';
  let issueId;
  let deleteId;

  test('Create an issue with every field: POST request to /api/issues/{project}', function(done) {
    chai.request(server)
      .post('/api/issues/' + project)
      .send({
        issue_title: 'Fix the flux capacitor',
        issue_text: 'It only works at 88 mph.',
        created_by: 'Marty',
        assigned_to: 'Doc',
        status_text: 'In progress'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Fix the flux capacitor');
        assert.equal(res.body.issue_text, 'It only works at 88 mph.');
        assert.equal(res.body.created_by, 'Marty');
        assert.equal(res.body.assigned_to, 'Doc');
        assert.equal(res.body.status_text, 'In progress');
        assert.isTrue(res.body.open);
        assert.property(res.body, '_id');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        issueId = res.body._id;
        done();
      });
  });

  test('Create an issue with only required fields: POST request to /api/issues/{project}', function(done) {
    chai.request(server)
      .post('/api/issues/' + project)
      .send({
        issue_title: 'Required fields only',
        issue_text: 'No optional fields supplied.',
        created_by: 'Tester'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, 'Required fields only');
        assert.equal(res.body.issue_text, 'No optional fields supplied.');
        assert.equal(res.body.created_by, 'Tester');
        assert.equal(res.body.assigned_to, '');
        assert.equal(res.body.status_text, '');
        assert.isTrue(res.body.open);
        assert.property(res.body, '_id');
        assert.property(res.body, 'created_on');
        assert.property(res.body, 'updated_on');
        deleteId = res.body._id;
        done();
      });
  });

  test('Create an issue with missing required fields: POST request to /api/issues/{project}', function(done) {
    chai.request(server)
      .post('/api/issues/' + project)
      .send({ issue_title: 'Missing fields' })
      .end(function(err, res) {
        assert.deepEqual(res.body, { error: 'required field(s) missing' });
        done();
      });
  });

  test('View issues on a project: GET request to /api/issues/{project}', function(done) {
    chai.request(server)
      .get('/api/issues/' + project)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.isAtLeast(res.body.length, 2);
        const issue = res.body[0];
        ['_id', 'issue_title', 'issue_text', 'created_by', 'assigned_to', 'status_text', 'created_on', 'updated_on', 'open']
          .forEach(function(field) { assert.property(issue, field); });
        done();
      });
  });

  test('View issues on a project with one filter: GET request to /api/issues/{project}', function(done) {
    chai.request(server)
      .get('/api/issues/' + project)
      .query({ created_by: 'Marty' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.isAtLeast(res.body.length, 1);
        res.body.forEach(function(issue) {
          assert.equal(issue.created_by, 'Marty');
        });
        done();
      });
  });

  test('View issues on a project with multiple filters: GET request to /api/issues/{project}', function(done) {
    chai.request(server)
      .get('/api/issues/' + project)
      .query({ created_by: 'Marty', open: true })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.isAtLeast(res.body.length, 1);
        res.body.forEach(function(issue) {
          assert.equal(issue.created_by, 'Marty');
          assert.isTrue(issue.open);
        });
        done();
      });
  });

  test('Update one field on an issue: PUT request to /api/issues/{project}', function(done) {
    chai.request(server)
      .put('/api/issues/' + project)
      .send({ _id: issueId, status_text: 'Almost done' })
      .end(function(err, res) {
        assert.deepEqual(res.body, { result: 'successfully updated', _id: issueId });
        done();
      });
  });

  test('Update multiple fields on an issue: PUT request to /api/issues/{project}', function(done) {
    chai.request(server)
      .put('/api/issues/' + project)
      .send({ _id: issueId, assigned_to: 'Einstein', open: false })
      .end(function(err, res) {
        assert.deepEqual(res.body, { result: 'successfully updated', _id: issueId });
        done();
      });
  });

  test('Update an issue with missing _id: PUT request to /api/issues/{project}', function(done) {
    chai.request(server)
      .put('/api/issues/' + project)
      .send({ issue_title: 'No id supplied' })
      .end(function(err, res) {
        assert.deepEqual(res.body, { error: 'missing _id' });
        done();
      });
  });

  test('Update an issue with no fields to update: PUT request to /api/issues/{project}', function(done) {
    chai.request(server)
      .put('/api/issues/' + project)
      .send({ _id: issueId })
      .end(function(err, res) {
        assert.deepEqual(res.body, { error: 'no update field(s) sent', _id: issueId });
        done();
      });
  });

  test('Update an issue with an invalid _id: PUT request to /api/issues/{project}', function(done) {
    const badId = 'not-a-real-id';
    chai.request(server)
      .put('/api/issues/' + project)
      .send({ _id: badId, issue_title: 'Cannot update' })
      .end(function(err, res) {
        assert.deepEqual(res.body, { error: 'could not update', _id: badId });
        done();
      });
  });

  test('Delete an issue: DELETE request to /api/issues/{project}', function(done) {
    chai.request(server)
      .delete('/api/issues/' + project)
      .send({ _id: deleteId })
      .end(function(err, res) {
        assert.deepEqual(res.body, { result: 'successfully deleted', _id: deleteId });
        done();
      });
  });

  test('Delete an issue with an invalid _id: DELETE request to /api/issues/{project}', function(done) {
    const badId = 'not-a-real-id';
    chai.request(server)
      .delete('/api/issues/' + project)
      .send({ _id: badId })
      .end(function(err, res) {
        assert.deepEqual(res.body, { error: 'could not delete', _id: badId });
        done();
      });
  });

  test('Delete an issue with missing _id: DELETE request to /api/issues/{project}', function(done) {
    chai.request(server)
      .delete('/api/issues/' + project)
      .send({})
      .end(function(err, res) {
        assert.deepEqual(res.body, { error: 'missing _id' });
        done();
      });
  });
});
