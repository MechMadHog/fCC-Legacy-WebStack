var express = require('express');
var cors = require('cors');
// My Code Below:
var multer = require('multer');
// My Code Above:
require('dotenv').config()

var app = express();
// My Code Below:
var upload = multer({ storage: multer.memoryStorage() });
// My Code Above:

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// My Code Below:
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) return res.json({ error: 'No file uploaded' });

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});
// My Code Above:

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});