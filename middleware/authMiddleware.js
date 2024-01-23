import jwt from 'jsonwebtoken';
import User from '../model/user.js';

const isUserAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'something secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/signin');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/signin');
  }
};

export async function checkUser(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'something secret', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user; // creating a variable/property that will be accessible to views. we will apply this to all the get requests
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

export default isUserAuthenticated;
