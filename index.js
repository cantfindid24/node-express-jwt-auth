import express from 'express';
import connectMongoDb from './connection.js';
import auth from './route/auth.js';
const PORT = 8001;
const app = express();

connectMongoDb('mongodb://127.0.0.1/node-express-jwt-auth').then(() =>
  console.log('Connected to DB')
);

// middleware
app.use(express.static('public'));

// view engine
app.set('view engine', 'ejs');
import path from 'path';
const __dirname = path.resolve();
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use('/', auth);

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
