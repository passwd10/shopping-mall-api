import express from 'express';

import { searchItems } from '../services/itemService'

const router = express.Router();

router.get('/search', async (req, res) => {
  const { q } = req.query;
  const products = await searchItems(q);
  // if(products.length === 0) {
  //   res.status(400).send();
  //   return;
  // }

  return res.send(products);
})

export default router;
