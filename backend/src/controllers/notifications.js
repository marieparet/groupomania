const db = require('../models')
const { Notification } = db.sequelize.models

exports.getNotificationsOfOneUser = (req, res, next) => {
  const options = {
    where: { recipientUserId: req.user.id },
    include: [{ model: db.User, as: 'Sender' }],
    order: [['createdAt', 'DESC']]
  }

  Notification.findAll(options)
    .then(notifications => {
      res.status(200).json({ notifications })
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({ error })
    })
}
