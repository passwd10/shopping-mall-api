import express from 'express';

import { setUserStore, getUserInfo } from '../services/userService';

const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.session;
  try {
    const id = await getUserInfo(userId);
    res.status(200).send({ userId: id });
  } catch (err) {
    res.status(400).send('error')
  }
});

router.patch('/', async (req, res) => {
  const { userId } = req.session;
  const { updateInfo } = req.body;
  await setUserStore(userId, updateInfo);
  res.status(200).send();
});

export default router;
