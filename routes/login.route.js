import express from 'express';

import { isUserInUserStore } from '../services/userService';

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, userPasswd } = req.body;
  try {
    req.session.userId = await isUserInUserStore(userId, userPasswd);
    res.status(200).send();
  } catch (err) {
    res.status(400).send('login fail');
  }
});

router.delete('/', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('Session Destroyed');
});

export default router;
