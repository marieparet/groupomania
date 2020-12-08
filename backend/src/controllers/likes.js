const db = require('../models')
const { Likes } = db.sequelize.models

exports.likeOnePost = async (req, res, next) => {
  const existingLike = await Likes.findOne({
    where: { userId: req.user.id, postId: req.params.postId }
  })

  if (existingLike) {
    await existingLike.destroy()
    res.status(200).json({ like: false })
  } else {
    await Likes.create({ userId: req.user.id, postId: req.params.postId })
    res.status(201).json({ like: true })
  }
}

exports.getLikeOnOnePost = async (req, res, next) => {
  const existingLike = await Likes.findOne({
    where: { userId: req.user.id, postId: req.params.postId }
  })
  res.status(200).json({ like: existingLike ? true : false })
}

exports.getAllLikesOfOnePost = async (req, res, next) => {
  const allLikes = await Likes.findAll({
    where: { postId: req.params.postId },
    include: db.User
  })
  res.status(200).json({ allLikes })
}
