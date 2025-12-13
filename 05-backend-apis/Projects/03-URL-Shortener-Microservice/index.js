require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// My Code Below:
const dns = require('dns');
const urlDatabase = new Map();
let nextId = 1;
// My Code Above:

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// My Code Below:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// My Code Above:

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// My Code Below:
app.post('/api/shorturl', (req, res) => {
  const original_url =
    (req.body && req.body.url) ||
    (req.body && req.body.input) ||
    (req.query && req.query.url);

  if (!original_url) return res.json({ error: 'invalid url' });

  let hostname;
  try {
    hostname = new URL(original_url).hostname;
  } catch (e) {
    return res.json({ error: 'invalid url' });
  }

  dns.lookup(hostname, { all: true }, (err, addresses) => {
    if (err || !addresses || addresses.length === 0) {
      return res.json({ error: 'invalid url' });
    }

    const short_url = nextId++;
    urlDatabase.set(short_url, original_url);

    return res.json({ original_url, short_url });
  });
});

app.get('/api/shorturl/:short_url', (req, res) => {
  const short_url = Number(req.params.short_url);
  const original_url = urlDatabase.get(short_url);

  if (!original_url) return res.json({ error: 'invalid url' });

  return res.redirect(original_url);
});
// My Code Above:

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
