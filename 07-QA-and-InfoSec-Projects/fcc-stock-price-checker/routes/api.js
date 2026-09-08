'use strict';

const crypto = require('crypto');
const https = require('https');

// The challenge only requires likes to persist while the app is running.
// Store only hashed IP values, never raw IP addresses.
const likesByStock = new Map();

function anonymizeIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const rawIp = (Array.isArray(forwarded) ? forwarded[0] : forwarded || req.ip || req.connection.remoteAddress || '')
    .split(',')[0]
    .trim();

  return crypto.createHash('sha256').update(rawIp).digest('hex');
}

function getQuote(stock) {
  const symbol = String(stock).trim().toLowerCase();
  const url = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${encodeURIComponent(symbol)}/quote`;

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let body = '';
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
          body += chunk;
        });
        response.on('end', () => {
          try {
            const data = JSON.parse(body);
            resolve({
              stock: String(data.symbol || stock).toUpperCase(),
              price: Number(data.latestPrice)
            });
          } catch (error) {
            reject(error);
          }
        });
      })
      .on('error', reject);
  });
}

function getLikeSet(stock) {
  const key = String(stock).toUpperCase();
  if (!likesByStock.has(key)) {
    likesByStock.set(key, new Set());
  }
  return likesByStock.get(key);
}

module.exports = function (app) {
  app.route('/api/stock-prices').get(async function (req, res) {
    try {
      const requestedStocks = Array.isArray(req.query.stock)
        ? req.query.stock.slice(0, 2)
        : [req.query.stock];

      if (!requestedStocks[0]) {
        return res.json({ stockData: {} });
      }

      const shouldLike = String(req.query.like).toLowerCase() === 'true';
      const ipHash = anonymizeIp(req);
      const quotes = await Promise.all(requestedStocks.map(getQuote));

      const data = quotes.map((quote) => {
        const likes = getLikeSet(quote.stock);
        if (shouldLike) {
          likes.add(ipHash);
        }

        return {
          stock: quote.stock,
          price: quote.price,
          likes: likes.size
        };
      });

      if (data.length === 1) {
        return res.json({ stockData: data[0] });
      }

      const firstLikes = data[0].likes;
      const secondLikes = data[1].likes;

      return res.json({
        stockData: [
          {
            stock: data[0].stock,
            price: data[0].price,
            rel_likes: firstLikes - secondLikes
          },
          {
            stock: data[1].stock,
            price: data[1].price,
            rel_likes: secondLikes - firstLikes
          }
        ]
      });
    } catch (error) {
      res.status(500).json({ error: 'could not retrieve stock data' });
    }
  });
};
