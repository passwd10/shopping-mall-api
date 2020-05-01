import express from 'express';
import session from 'express-session';
import cors from 'cors';
import Route from './routes';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    name: 'userId',
    httpOnly: false,
    secure: false,
  }
}));

app.use(Route);
app.use('/static', express.static('public'));

export default app;
