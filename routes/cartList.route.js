import express from 'express';
import { getCartList, addCartList, deleteCartList } from '../services/cartService';
import session from 'express-session';

const router = express.Router();

router.get('/', async (req, res) => {
  const cart = await getCartList(session.Store._id);
  console.log('getCart', cart);
  res.status(200).send(cart);
});

router.post('/', async (req, res) => {
  const { productId } = req.body;
  const cart = await addCartList(session.Store._id, productId);
  res.status(200).send(cart);
});

router.delete('/', async (req, res) => {
  const { productId } = req.body;
  const cart = await deleteCartList(session.Store._id, productId);
  res.status(200).send(cart);
})

export default router;
