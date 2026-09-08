'use strict';

const crypto = require('crypto');

// The legacy FCC challenge does not require a particular database.
// Keep the project deliberately small and store issues in memory.
const issuesByProject = new Map();

function projectIssues(project) {
  if (!issuesByProject.has(project)) issuesByProject.set(project, []);
  return issuesByProject.get(project);
}

function makeId() {
  return crypto.randomBytes(12).toString('hex');
}

function normalizeOpen(value) {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return value;
}

function matchesFilter(issue, key, value) {
  if (!(key in issue)) return false;
  if (key === 'open') return issue.open === normalizeOpen(value);
  return String(issue[key]) === String(value);
}

module.exports = function (app) {
  app.route('/api/issues/:project')
    .get(function (req, res) {
      const project = req.params.project;
      const filters = req.query;
      const issues = projectIssues(project).filter(function (issue) {
        return Object.keys(filters).every(function (key) {
          return matchesFilter(issue, key, filters[key]);
        });
      });

      res.json(issues);
    })

    .post(function (req, res) {
      const project = req.params.project;
      const { issue_title, issue_text, created_by } = req.body;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' });
      }

      const now = new Date();
      const issue = {
        _id: makeId(),
        issue_title,
        issue_text,
        created_by,
        assigned_to: req.body.assigned_to || '',
        status_text: req.body.status_text || '',
        created_on: now,
        updated_on: now,
        open: true
      };

      projectIssues(project).push(issue);
      res.json(issue);
    })

    .put(function (req, res) {
      const project = req.params.project;
      const id = req.body._id;

      if (!id) return res.json({ error: 'missing _id' });

      const allowed = [
        'issue_title',
        'issue_text',
        'created_by',
        'assigned_to',
        'status_text',
        'open'
      ];
      const updates = allowed.filter(function (field) {
        return Object.prototype.hasOwnProperty.call(req.body, field) && req.body[field] !== '';
      });

      if (updates.length === 0) {
        return res.json({ error: 'no update field(s) sent', _id: id });
      }

      const issue = projectIssues(project).find(function (item) {
        return item._id === id;
      });

      if (!issue) return res.json({ error: 'could not update', _id: id });

      try {
        updates.forEach(function (field) {
          issue[field] = field === 'open' ? normalizeOpen(req.body[field]) : req.body[field];
        });
        issue.updated_on = new Date();
        return res.json({ result: 'successfully updated', _id: id });
      } catch (err) {
        return res.json({ error: 'could not update', _id: id });
      }
    })

    .delete(function (req, res) {
      const project = req.params.project;
      const id = req.body._id;

      if (!id) return res.json({ error: 'missing _id' });

      const issues = projectIssues(project);
      const index = issues.findIndex(function (issue) {
        return issue._id === id;
      });

      if (index === -1) return res.json({ error: 'could not delete', _id: id });

      issues.splice(index, 1);
      res.json({ result: 'successfully deleted', _id: id });
    });
};
