const db = require('../../src/models')
const { User } = db.sequelize.models

exports.signup = (req, res, next) => {
  User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(user => res.status(201).json({ user }))
    .catch(error => res.status(400).json({ error }))
}
