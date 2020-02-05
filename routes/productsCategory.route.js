import express from 'express'

import { getCategories } from '../services/categoryService'

const router = express.Router();

console.log('hi');

router.get('/', async (req, res) => {
  const categories = await getCategories();
  console.log(categories)
  res.send(categories);
});

export default router;
