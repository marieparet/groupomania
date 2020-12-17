'use strict'
const { Model } = require('sequelize')
const {
  ensurePasswordIsStrongEnough,
  addAuthenticationOn
} = require('../services/authentication')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Post, { foreignKey: 'userId' })
    }

    softDestroy () {
      return this.update({
        deleted: true,
        email: `deleted-user${this.id}@groupomania.com`,
        imageUrl: null,
        firstName: 'Utilisateur',
        lastName: 'Supprimé'
      })
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
        allowNull: false,
        validate: {
          isEmail: true,
          //utilisation d'une méthode pour pouvoir afficher un message d'erreur customisé
          async ensureEmailIsUnique (email) {
            if (await User.findOne({ where: { email } }))
              throw new Error('Un compte existe déjà avec cette adresse mail !')
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          ensurePasswordIsStrongEnough
        }
      },
      imageUrl: DataTypes.STRING,
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  addAuthenticationOn(User)

  return User
}
