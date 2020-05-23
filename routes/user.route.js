import express from 'express';

import { setUserStore, getUserInfo } from '../services/userService';
import session from 'express-session';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await getUserInfo(session.Store._id);
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send('error')
  }
});

router.patch('/', async (req, res) => {
  const { updateInfo } = req.body;
  await setUserStore(session.Store._id, updateInfo);
  res.status(200).send();
});

export default router;
