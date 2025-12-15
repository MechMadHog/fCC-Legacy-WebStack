const chai = require("chai");
const assert = chai.assert;

const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("GET /api/convert", function () {
    test("Convert a valid input such as 10L: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "10L" })
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, "L");
          assert.equal(res.body.returnUnit, "gal");
          assert.property(res.body, "returnNum");
          assert.property(res.body, "string");
          done();
        });
    });

    test("Convert an invalid input such as 32g: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "32g" })
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "invalid unit" });
          done();
        });
    });

    test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "3/7.2/4kg" })
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "invalid number" });
          done();
        });
    });

    test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "3/7.2/4kilomegagram" })
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: "invalid number and unit" });
          done();
        });
    });

    test("Convert with no number such as kg: GET request to /api/convert", function (done) {
      chai
        .request(server)
        .get("/api/convert")
        .query({ input: "kg" })
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, "kg");
          assert.equal(res.body.returnUnit, "lbs");
          done();
        });
    });
  });
});
