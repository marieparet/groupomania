const db = require('../../src/models')
const jwt = require('jsonwebtoken')
const { User } = db.sequelize.models

const newToken = userId => {
  token = jwt.sign({ userId }, 'RANDOM_TOKEN_SECRET', {
    expiresIn: '24h'
  })
  return { userId, token }
}

exports.signup = (req, res, next) => {
  User.create({
    email: req.body.email,
    password: req.body.password
  }).then(user =>
    res
      .status(201)
      .json(newToken(user.id))
      .catch(error => res.status(400).json({ error }))
  )
}

exports.login = async (req, res, next) => {
  try {
    const response = await User.authenticate(req.body.email, req.body.password)

    if (response.valid) {
      res.status(200).json(newToken(response.user.id))
    } else {
      res.status(401).json({ error: response.message })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
