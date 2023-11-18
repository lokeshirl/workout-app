import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validations
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough');
  }

  const userExist = await this.findOne({ email });

  if (userExist) throw new Error('email already in use');

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = this.create({ email, password: hashPassword });

  return user;
};

userSchema.statics.login = async function (email, password) {
  // validations
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await this.findOne({ email });

  if (!user) throw new Error('Incorrect email');

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error('Invalid password');

  return user;
};

const User = model('User', userSchema);

export default User;
