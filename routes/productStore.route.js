import express from 'express';

import { addItem, getItem, getItems } from '../services/itemService';

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await getItems();
  if (products.length === 0) {
    res.status(404).send();
    return;
  }
  res.status(200).send(products);
});

router.get('/:id', async (req, res) => {
  const product = await getItem(req.params.id);
  if (product.length === 0) {
    res.status(404).send();
    return;
  }
  res.status(200).send(product);
})

router.post('/', (req, res) => {
  const item = addItem(req.body);
  res.status(200).send({ item });
})

export default router;
