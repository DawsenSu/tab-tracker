const bcrypt = require('bcrypt')

// eslint-disable-next-line no-unused-vars
async function hashPassword(user, options) {
  const SALT_ROUND = 10
  if(!user.changed('password')){
    return
  }

  return bcrypt.hash(user.password, SALT_ROUND)
    .then((hash) => {
      user.setDataValue('password',hash)
    })
}



module.exports =  (sequelize, DataTypes)  =>{
  const User = sequelize.define('User', {
    email : {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        beforeSave: hashPassword
      }
    })

  User.prototype.comparePassword = async function (password) {
    
    console.log(`${password}-${this.password}`)
    const result = await bcrypt.compare(password,this.password)
    console.log(result)
    return result
  }

  return User
}