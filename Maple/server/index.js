import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/index.js';
import db from './models/index.js';

dotenv.config();
const { PORT, NODE_ENV, COOKIE_SECRET } = process.env;

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use([express.static('public'), express.json()]);
app.set('port', PORT || 8080);

app.use((req, res, next) => {
  if (NODE_ENV === 'production') morgan('combined')(req, res, next);
  else morgan('dev')(req, res, next);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: 'session',
  })
);

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('디비 연결!');
  })
  .catch((error) => {
    console.log('에러났다.');
    console.error(error);
  });

app.use('/api', routes);

app.use('/upload', express.static('upload'));

app.post('/upload_files', (req, res) => {
  if (req.files.length > 0) {
    res.json(req.files[0]);
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}` + '포트열어따리');
});
