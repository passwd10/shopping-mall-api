import UserRepository from '../repositories/user.repository';

const userRepo = new UserRepository();

const isUserInUserStore = async (userId, userPasswd) => {
  const data = await userRepo.findByIdPassword(userId, userPasswd);
  if (data.length === 0) {
    throw new Error('Invalid id or password');
  }
  return data[0]._id;
}

const getUserInfo = async (id) => {
  const data = await userRepo.findById(id); 

  if (data.length === 0) {
    throw new Error('There is no session info')
  }

  return data[0];
}

const setUserStore = (id, updateInfo) => {
  return userRepo.setUser(id, updateInfo);
};

const createUserList = (userInfo) => {
  return userRepo.store(userInfo)
};

export {
  isUserInUserStore,
  getUserInfo,
  setUserStore,
  createUserList,
};
