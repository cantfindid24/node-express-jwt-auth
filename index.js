import express from 'express';
import connectMongoDb from './connection.js';
import cookieParser from 'cookie-parser';
import auth from './route/auth.js';
const PORT = 8001;
const app = express();

connectMongoDb('mongodb://127.0.0.1/node-express-jwt-auth').then(() =>
  console.log('Connected to DB')
);

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');
import path from 'path';
const __dirname = path.resolve();
app.set('views', path.join(__dirname, '/views'));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use('/', auth);

//cookies learning
app.get('/set-cookies', (req, res) => {
  res.setHeader('Set-Cookie', 'cookieKey1=value1');
  res.setHeader('Set-Cookie', 'cookieKey2=value2');
  res.setHeader('Set-Cookie', 'newUser=false');
  res.setHeader('Set-Cookie', 'newUser=true');
  res.cookie('key', 'value', 'ohter');
  res.cookie('newUser', false);
  res.cookie('isEmployee', true);
  res.cookie('hello', true, { secure: true });
  res.cookie('isBoss', true, { maxAge: 1000 * 10, httpOnly: true }); //10sec

  res.send('You got the cookie');
});
app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  res.json(cookies);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
