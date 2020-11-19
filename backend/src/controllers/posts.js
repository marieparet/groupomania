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

exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then(post => res.status(200).json({ post }))
    .catch(error => res.status(404).json({ error }))
}

exports.getAllPosts = (req, res, next) => {
  const page = req.query.page || 1
  console.log('page')
  const limit = 4
  Post.findAll({
    limit,
    offset: limit * (page - 1)
  })
    .then(posts => res.status(200).json({ posts }))
    .catch(error => res.status(400).json({ error }))
}

exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/public/${
          req.file.filename
        }`
      }
    : { ...req.body }

  Post.findOne({
    where: { id: req.params.id, userId: req.user.id }
  }).then(post => {
    if (!post) {
      res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
    } else {
      post
        .update(postObject)
        .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
    }
  })
}

exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id, userId: req.user.id } })
    .then(post => {
      if (!post) {
        res.status(400).json({ error: "Vous n'avez pas l'autorisation" })
      } else if (post.imageUrl) {
        const filename = post.imageUrl.split('/public/')[1]
        fs.unlink(`public/${filename}`, () => {})
      }
      post
        .destroy()
        .then(() =>
          res.status(200).json({ message: 'Publication supprimée !' })
        )
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error: error.message }))
}
