const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))

// My Code Below:
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// My Code Above:

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// My Code Below:
const users = new Map()
let userIdCounter = 1

// 1 - Create a new user
app.post('/api/users', (req, res) => {
  const username = req.body.username
  if (!username) return res.json({ error: 'username required' })

  const _id = String(userIdCounter++)
  users.set(_id, { username, exercises: [] })

  res.json({ username, _id })
})

// 2 - Get all users
app.get('/api/users', (req, res) => {
  const allUsers = Array.from(users.entries()).map(([id, u]) => ({
    username: u.username,
    _id: id
  }))
  res.json(allUsers)
})

// 3 - Add exercise to a user
app.post('/api/users/:_id/exercises', (req, res) => {
  const user = users.get(req.params._id)
  if (!user) return res.json({ error: 'user not found' })

  const { description, duration, date } = req.body
  if (!description || !duration) return res.json({ error: 'missing fields' })

  const d = date ? new Date(date) : new Date()
  if (isNaN(d.getTime())) return res.json({ error: 'invalid date' })

  const exercise = {
    description: String(description),
    duration: Number(duration),
    date: d.toDateString()
  }

  user.exercises.push(exercise)

  res.json({
    _id: req.params._id,
    username: user.username,
    ...exercise
  })
})

// 4 - Get exercise logs
app.get('/api/users/:_id/logs', (req, res) => {
  const user = users.get(req.params._id)
  if (!user) return res.json({ error: 'user not found' })

  let log = [...user.exercises]

  const { from, to, limit } = req.query

  if (from) {
    const fromDate = new Date(from)
    log = log.filter(e => new Date(e.date) >= fromDate)
  }

  if (to) {
    const toDate = new Date(to)
    log = log.filter(e => new Date(e.date) <= toDate)
  }

  if (limit) {
    log = log.slice(0, Number(limit))
  }

  res.json({
    _id: req.params._id,
    username: user.username,
    count: log.length,
    log
  })
})
// My Code Above:

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
