const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const path = require('path')

const postsRoutes = require('./src/routes/posts')
const userRoutes = require('./src/routes/user')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use('/api/posts', postsRoutes)
app.use('/api/auth', userRoutes)

module.exports = app
