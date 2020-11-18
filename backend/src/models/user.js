'use strict'
const { Model, INTEGER, STRING } = require('sequelize')
const {
  ensurePasswordIsStrongEnough,
  addAuthenticationOn
} = require('../services/authentication')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasMany(models.Post)
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          ensurePasswordIsStrongEnough
        }
      },
      imageUrl: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  addAuthenticationOn(User)

  return User
}
