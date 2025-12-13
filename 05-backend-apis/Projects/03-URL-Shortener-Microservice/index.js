require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
// My Code Below:
const dns = require('dns');
// My Code Above:

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


// My Code Below:
const urlDatabase = new Map();
let nextId = 1;

app.post('/api/shorturl', (req, res) => {
  const original_url = req.body.url;

  let hostname;
  try {
    const parsed = new URL(original_url);
    hostname = parsed.hostname;
  } catch {
    return res.json({ error: 'invalid url' });
  }

  dns.lookup(hostname, (err) => {
    if (err) return res.json({ error: 'invalid url' });

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
