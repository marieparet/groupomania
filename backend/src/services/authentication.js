const bcrypt = require('bcrypt')

module.exports = function addAuthenticationOn (User) {
  const ensureStrongPassword = user => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/
    if (user.changed('password') && !user.password.match(regex)) {
      throw new Error("Le mot de passe n'est pas assez sécurisé")
    }
  }

  const encryptPassword = user => {
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 10).then(hash => {
        user.password = hash
      })
    }
  }

  User.authenticate = async (email, password) => {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return { valid: false, message: 'Utilisateur non trouvé' }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid) return { valid: true, user }
    else return { valid: false, message: 'Mot de passe incorrect' }
  }

  User.beforeCreate(ensureStrongPassword)
  User.beforeUpdate(ensureStrongPassword)
  User.beforeCreate(encryptPassword)
  User.beforeUpdate(encryptPassword)
}