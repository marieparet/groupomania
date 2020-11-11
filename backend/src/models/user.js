'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: DataTypes.STRING,
      imageUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  const encryptPassword = user => {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
      })
    }
  }

  User.beforeCreate(encryptPassword)
  User.beforeUpdate(encryptPassword)

  return User
}
