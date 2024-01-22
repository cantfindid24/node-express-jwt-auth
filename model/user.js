import mongoose from 'mongoose';
import pkg from 'validator';
const { isEmail } = pkg;
import bcrypt from 'bcrypt';
const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Please enter your name'] },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email'],
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minLength: [6, 'Minimum password length is 6 characters'],
  },
});

//mongoose hook: fires a function before the doc is saved
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log('user about to be created and saved', this);
  next();
});
//mongoose hook: fires a function after the doc is saved to db
userSchema.post('save', function (doc, next) {
  console.log('new user is  created and saved', doc);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
