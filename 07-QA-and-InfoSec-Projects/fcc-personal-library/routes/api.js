/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const crypto = require('crypto');

module.exports = function (app) {
  const books = [];

  function newId() {
    return crypto.randomBytes(12).toString('hex');
  }

  function findBook(id) {
    return books.find(book => book._id === id);
  }

  app.route('/api/books')
    .get(function (req, res) {
      res.json(books.map(book => ({
        _id: book._id,
        title: book.title,
        commentcount: book.comments.length
      })));
    })

    .post(function (req, res) {
      const title = req.body.title;
      if (!title) return res.type('text').send('missing required field title');

      const book = { _id: newId(), title: title, comments: [] };
      books.push(book);
      res.json({ _id: book._id, title: book.title });
    })

    .delete(function (req, res) {
      books.length = 0;
      res.type('text').send('complete delete successful');
    });

  app.route('/api/books/:id')
    .get(function (req, res) {
      const book = findBook(req.params.id);
      if (!book) return res.type('text').send('no book exists');
      res.json({ _id: book._id, title: book.title, comments: book.comments });
    })

    .post(function (req, res) {
      const comment = req.body.comment;
      if (!comment) return res.type('text').send('missing required field comment');

      const book = findBook(req.params.id);
      if (!book) return res.type('text').send('no book exists');

      book.comments.push(comment);
      res.json({ _id: book._id, title: book.title, comments: book.comments });
    })

    .delete(function (req, res) {
      const index = books.findIndex(book => book._id === req.params.id);
      if (index === -1) return res.type('text').send('no book exists');
      books.splice(index, 1);
      res.type('text').send('delete successful');
    });
};
