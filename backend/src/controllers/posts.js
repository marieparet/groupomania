const fs = require('fs')

const db = require('../models')
const { Post } = db.sequelize.models

exports.createPost = async (req, res, next) => {
  const postObject = JSON.parse(req.body.post)

  if (req.file) {
    postObject.imageUrl = `${req.protocol}://${req.get('host')}/public/${
      req.file.filename
    }`
  }

  try {
    const post = await Post.create({
      ...postObject,
      userId: req.user.id
    })

    res.status(201).json({ post })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error })
  }
}
