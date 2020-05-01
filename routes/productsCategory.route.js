import express from 'express'

import { getCategories } from '../services/categoryService'

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await getCategories();
  if (categories.length === 0) {
    res.status(404).send();
    return;
  }
  res.status(200).send(categories);
});

export default router;
