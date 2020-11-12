const db = require('../../src/models')
const jwt = require('jsonwebtoken')
const { User } = db.sequelize.models

exports.signup = (req, res, next) => {
  User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(user => res.status(201).json({ user }))
    .catch(error => res.status(400).json({ error }))
}

exports.login = async (req, res, next) => {
  try {
    const response = await User.authenticate(req.body.email, req.body.password)

    if (response.valid) {
      res.status(200).json({
        userId: response.user.id,
        token: jwt.sign({ userId: response.user.id }, 'RANDOM_TOKEN_SECRET', {
          expiresIn: '24h'
        })
      })
    } else {
      res.status(401).json({ error: response.message })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
