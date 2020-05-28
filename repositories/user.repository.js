import User from '../models/userSchema';

import _ from 'lodash';

class UserRepository {
  constructor() { }

  async store(userInfo) {
    const { userId, password, name, phoneNum, birth } = userInfo;

    const newUser = await User.create({
      userId: userId,
      password: password,
      name: name,
      phoneNum: phoneNum,
      birth: birth,
      cartList: [],
    })

    return newUser;
  };

  async findByName(name) {
    return await User.find({
      name: name,
    });
  };

  async findByUserId(userId) {
    return await User.find({
      userId: userId,
    });
  };

  async findById(id) {
    return await User.find({
      _id: id,
    });
  };

  async findByIdPassword(id, password) {
    return await User.find({
      userId: id,
      password: password,
    });
  };

  async findAll() {
    const users = await User.find({});
    return users;
  };

  async setUser(id, updateInfo) {
    await User.updateOne({ _id: id }, updateInfo);
    return User.find({
      _id: id,
    });
  };

  async addCart(id, product) {
    console.log('id',id, 'product', product)
    const user = await this.findById(id);
    const userCart = _.uniqBy([...user[0].cartList, product], 'productId');

    await User.updateOne({ _id: id }, { cartList: userCart });
    return User.find({
      _id: id,
    });
  };

  async deleteOneInCart(id, product) {
    const user = await this.findById(id);
    const userCart = _.remove(user[0].cartList, (v) => {
      return !_.isEqual(v, product);
    });

    await User.updateOne({ _id: id }, { cartList: userCart });
    return User.find({
      _id: id,
    });
  }
}

export default UserRepository;
