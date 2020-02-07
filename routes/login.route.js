import express from 'express';

import { isUserInUserStore } from '../services/userService';

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, userPasswd } = req.body;
  const userInfo = await isUserInUserStore(userId, userPasswd);
  const session = req.session;

  session.userInfo = userInfo;
  res.cookie('userInfoCookie',{
    httpOnly: false,
    secure: false,
    domain: 'answer-shopping-mall.netlify.com',});
  res.send(session.userInfo);
});

router.delete('/', (req, res) => {
  req.session.destroy();
  res.clearCookie('connect.sid');
  res.send('Session Destroyed');
});

export default router;
