const bcrypt = require('bcryptjs')

// eslint-disable-next-line no-unused-vars
async function hashPassword(user) {
  const SALT_ROUND = 10
  if(!user.changed('password')){
    return
  }
  const hash = await bcrypt.hash(user.password, SALT_ROUND)
  user.setDataValue('password', hash)
}

module.exports =  (sequelize, DataTypes)  =>{
  const User = sequelize.define('User', {
    email : {
        type: DataTypes.STRING,
        unique: true
      },
    password: {
        type: DataTypes.STRING
      }
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
      },
      instanceMethods: {
        validPassword: function(pwd) {
          return bcrypt.compareSync(pwd, this.password)
        }
      }
    }
  )

  User.prototype.comparePassword = async function (pwd) {
    return await bcrypt.compare(pwd, this.password)
  }

  return User
}
