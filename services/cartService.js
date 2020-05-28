import UserRepository from '../repositories/user.repository';
import ProductStoreRepository from '../repositories/productStore.repository';

const userRepo = new UserRepository();
const productRepo = new ProductStoreRepository();

const getCartList = async (id) => {
  return userRepo.findById(id);
}

const addCartList = async (id, productId) => {
  const productToAdd = await productRepo.findById(productId);
  const cartList = { productId: productToAdd[0].id, purchase: true };
  return userRepo.addCart(id, cartList);
};

const deleteCartList = async (id, productId) => {

  const productToDelete = await productRepo.findById(productId);
  const cartList = { productId: productToDelete[0].id, purchase: true };

  return userRepo.deleteOneInCart(id, cartList);
}

export { getCartList, addCartList, deleteCartList };
