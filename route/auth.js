import express from 'express';
const router = express.Router();
import User from '../model/user.js';

const handleValidationError = (err) => {
  // console.log(err.message, err.code);
  let errors = {};

  //duplicate error code
  if (err.code === 11000) {
    errors.email = 'an user with this email already exists';
    return errors;
  }

  //validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

router
  .get('/signup', (req, res) => {
    return res.render('signup');
  })
  .post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const newUser = await User.create({
        name,
        email,
        password,
      });
      res.status(201).json({ msg: 'new user signed up' });
    } catch (error) {
      const errors = handleValidationError(error);
      res.status(400).json({ errors });
    }
  });

router
  .get('/signin', (req, res) => {
    return res.render('signin');
  })
  .post('/signin', (req, res) => {
    const { email, password } = req.body;
    res.json({ email, password });
  });

export default router;

// handleUserSignup
// handleUserSignup
