import express from 'express';

import { isUserInUserStore } from '../services/userService';
import session from 'express-session';

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, userPasswd } = req.body;
  try {
    session.Store._id = await isUserInUserStore(userId, userPasswd);
    res.json({ isLogin: true });
  } catch (err) {
    res.status(400).send();
  }
});

router.delete('/', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('Session Destroyed');
});

export default router;
