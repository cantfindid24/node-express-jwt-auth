import jwt from 'jsonwebtoken';

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

export default isUserAuthenticated;
