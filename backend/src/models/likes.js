'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Likes.belongsTo(models.User, { foreignKey: 'userId' })
      Likes.belongsTo(models.Post, { foreignKey: 'postId' })
    }
  }
  Likes.init(
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Likes'
    }
  )

  Likes.afterCreate(async like => {
    console.log('like', like)
    const post = await like.getPost()
    console.log('post', post)
    await post.update({
      likesCount: post.likesCount + 1
    })
    console.log(post)
  })
  Likes.afterDestroy(async like => {
    const post = await like.getPost()
    post.update({
      likesCount: post.likesCount - 1
    })
  })

  return Likes
}
