const db = require('../models')
const { Comments } = db.sequelize.models

exports.createComment = async (req, res, next) => {
  try {
    let comment = await Comments.create({
      ...req.body,
      postId: req.params.postId,
      userId: req.user.id
    })

    comment = await Comments.findOne({
      where: { id: comment.id },
      include: db.User
    })

    res.status(201).json({ comment })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}

exports.getOneComment = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id }, include: db.User })
    .then(comment => res.status(200).json({ comment }))
    .catch(error => res.status(404).json({ error }))
}

exports.getAllComments = (req, res, next) => {
  const options = {
    include: db.User,

    order: [['createdAt', 'DESC']]
  }

  Comments.findAll(options)
    .then(comments => res.status(200).json({ comments }))
    .catch(error => res.status(400).json({ error }))
}

exports.modifyComment = (req, res, next) => {
  Comments.findOne({
    where: { id: req.params.id, userId: req.user.id },
    include: db.User
  }).then(comment => {
    if (!comment) {
      res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
    } else {
      comment
        .update(req.body)
        .then(comment => res.status(200).json({ comment }))
    }
  })
}

exports.deleteComment = (req, res, next) => {
  Comments.findOne({ where: { id: req.params.id, userId: req.user.id } })
    .then(comment => {
      if (!comment) {
        res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
      }
      comment
        .destroy()
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
