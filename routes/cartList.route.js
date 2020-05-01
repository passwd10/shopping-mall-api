import express from 'express';
import { getCartList, addCartList, deleteCartList } from '../services/cartService';

const router = express.Router();

router.get('/', async (req, res) => {
  const { userId } = req.session;
  const cart = await getCartList(userId);
  res.status(200).send(cart);
});

router.post('/', async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.session;
  const cart = await addCartList(userId, productId);
  res.status(200).send(cart);
});

router.delete('/', async (req, res) => {
  const { productId } = req.body;
  const { userId } = req.session;
  const cart = await deleteCartList(userId, productId);
  res.status(200).send(cart);
})

export default router;
