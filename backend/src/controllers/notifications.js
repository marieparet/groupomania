const db = require('../models')
const { Notification } = db.sequelize.models

exports.getNotificationsOfOneUser = (req, res, next) => {
  const options = {
    where: { userId: req.user.id },
    order: [['createdAt', 'DESC']]
  }

  Notification.findAll(options)
    .then(notifications => {
      res.status(200).json({ notifications })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}
