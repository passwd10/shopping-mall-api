import express from 'express';
import session from 'express-session';
import cors from 'cors';
import Route from './routes';
import mongoose from 'mongoose';

import { clearCollection, initCollection } from './services/collectionService';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true,
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    name: 'gggg',
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
    expires: new Date(Date.now() + 360000)
  }
}));

app.use(Route);
app.use('/static', express.static('public'));

const db = mongoose.connection;

db.on('error', console.error);
db.once('open', async () => {
  console.log('Connected to mongod server');
  // await clearCollection();
  // await initCollection();
});

mongoose.connect(process.env.MONGODB_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).catch(err => console.error(err));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export default app;
