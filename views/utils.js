import jwt from 'jsonwebtoken';
const generateToken = (id) => {
  return jwt.sign({ id }, 'something secret', {
    expiresIn: 24 * 60 * 60,
  });
};

export default generateToken;
