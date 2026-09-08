'use strict';

const crypto = require('crypto');

const boards = Object.create(null);

function id() {
  return crypto.randomBytes(12).toString('hex');
}

function getBoard(name) {
  if (!boards[name]) boards[name] = [];
  return boards[name];
}

function publicReply(reply) {
  return { _id: reply._id, text: reply.text, created_on: reply.created_on };
}

function publicThread(thread, limitReplies) {
  const replies = limitReplies
    ? thread.replies.slice().sort((a, b) => b.created_on - a.created_on).slice(0, 3)
    : thread.replies;
  return {
    _id: thread._id,
    text: thread.text,
    created_on: thread.created_on,
    bumped_on: thread.bumped_on,
    replies: replies.map(publicReply)
  };
}

module.exports = function (app) {
  app.route('/api/threads/:board')
    .post(function (req, res) {
      const now = new Date();
      const thread = {
        _id: id(),
        text: req.body.text,
        created_on: now,
        bumped_on: now,
        reported: false,
        delete_password: req.body.delete_password,
        replies: []
      };
      getBoard(req.params.board).push(thread);
      res.json(thread);
    })
    .get(function (req, res) {
      const threads = getBoard(req.params.board)
        .slice()
        .sort((a, b) => b.bumped_on - a.bumped_on)
        .slice(0, 10)
        .map(thread => publicThread(thread, true));
      res.json(threads);
    })
    .put(function (req, res) {
      const thread = getBoard(req.params.board).find(t => t._id === req.body.thread_id);
      if (thread) thread.reported = true;
      res.type('text').send('reported');
    })
    .delete(function (req, res) {
      const board = getBoard(req.params.board);
      const index = board.findIndex(t => t._id === req.body.thread_id);
      if (index === -1 || board[index].delete_password !== req.body.delete_password) {
        return res.type('text').send('incorrect password');
      }
      board.splice(index, 1);
      res.type('text').send('success');
    });

  app.route('/api/replies/:board')
    .post(function (req, res) {
      const thread = getBoard(req.params.board).find(t => t._id === req.body.thread_id);
      if (!thread) return res.status(404).type('text').send('thread not found');
      const now = new Date();
      thread.replies.push({
        _id: id(),
        text: req.body.text,
        created_on: now,
        delete_password: req.body.delete_password,
        reported: false
      });
      thread.bumped_on = now;
      res.json(thread);
    })
    .get(function (req, res) {
      const thread = getBoard(req.params.board).find(t => t._id === req.query.thread_id);
      if (!thread) return res.status(404).type('text').send('thread not found');
      res.json(publicThread(thread, false));
    })
    .put(function (req, res) {
      const thread = getBoard(req.params.board).find(t => t._id === req.body.thread_id);
      const reply = thread && thread.replies.find(r => r._id === req.body.reply_id);
      if (reply) reply.reported = true;
      res.type('text').send('reported');
    })
    .delete(function (req, res) {
      const thread = getBoard(req.params.board).find(t => t._id === req.body.thread_id);
      const reply = thread && thread.replies.find(r => r._id === req.body.reply_id);
      if (!reply || reply.delete_password !== req.body.delete_password) {
        return res.type('text').send('incorrect password');
      }
      reply.text = '[deleted]';
      res.type('text').send('success');
    });
};
