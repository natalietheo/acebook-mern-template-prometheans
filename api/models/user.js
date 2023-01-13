const mongoose = require('mongoose')
const validator = require('validator')
// import validator from 'validator'
// const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// const User = mongoose.model('User', UserSchema)

// static signup

UserSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password does not meet the requirements')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  //bcrypt
  // const salt = await bcrypt.genSalt(10)
  // const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password }).catch((err) => {
    throw err
  })

  return user
}

/*
UserSchema.statics.signup = (email, password) => {
  return User.findOne({ email })
    .then(exists => {
      if (exists) {
        throw Error('Email already in use');
      }
      return bcrypt.genSalt(10);
    })
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => User.create({ email, password: hash }))
    .catch(err => {
      throw err;
    });
};
*/
module.exports = mongoose.model('User', UserSchema)
