const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Viewing one stock: GET request to /api/stock-prices/', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isObject(res.body.stockData);
        assert.equal(res.body.stockData.stock, 'GOOG');
        assert.isNumber(res.body.stockData.price);
        assert.isNumber(res.body.stockData.likes);
        done();
      });
  });

  test('Viewing one stock and liking it: GET request to /api/stock-prices/', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG', like: true })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.stockData.stock, 'GOOG');
        assert.isNumber(res.body.stockData.price);
        assert.isAtLeast(res.body.stockData.likes, 1);
        done();
      });
  });

  test('Viewing the same stock and liking it again: GET request to /api/stock-prices/', function(done) {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG', like: true })
      .end(function(err, firstRes) {
        const likesAfterFirstRequest = firstRes.body.stockData.likes;

        chai.request(server)
          .get('/api/stock-prices')
          .query({ stock: 'GOOG', like: true })
          .end(function(err2, secondRes) {
            assert.equal(secondRes.status, 200);
            assert.equal(secondRes.body.stockData.likes, likesAfterFirstRequest);
            done();
          });
      });
  });

  test('Viewing two stocks: GET request to /api/stock-prices/', function(done) {
    chai.request(server)
      .get('/api/stock-prices?stock=GOOG&stock=MSFT')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData);
        assert.lengthOf(res.body.stockData, 2);
        assert.hasAllKeys(res.body.stockData[0], ['stock', 'price', 'rel_likes']);
        assert.hasAllKeys(res.body.stockData[1], ['stock', 'price', 'rel_likes']);
        assert.equal(res.body.stockData[0].rel_likes, -res.body.stockData[1].rel_likes);
        done();
      });
  });

  test('Viewing two stocks and liking them: GET request to /api/stock-prices/', function(done) {
    chai.request(server)
      .get('/api/stock-prices?stock=AAPL&stock=MSFT&like=true')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.isArray(res.body.stockData);
        assert.lengthOf(res.body.stockData, 2);
        assert.hasAllKeys(res.body.stockData[0], ['stock', 'price', 'rel_likes']);
        assert.hasAllKeys(res.body.stockData[1], ['stock', 'price', 'rel_likes']);
        assert.equal(res.body.stockData[0].rel_likes, -res.body.stockData[1].rel_likes);
        done();
      });
  });
});
