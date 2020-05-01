import UserRepository from '../repositories/user.repository';

const userRepo = new UserRepository();

const isUserInUserStore = async (userId, userPasswd) => {
  const data = await userRepo.findByIdPassword(userId, userPasswd);

  if (data.length === 0) {
    throw new Error('Invalid id or password');
  }
  
  return data[0].userId;
}

const getUserInfo = async (userId) => {
  const data = await userRepo.findById(userId); 

  if (data.length === 0) {
    throw new Error('There is no session info')
  }

  return data[0].userId;
}

const setUserStore = (userId, updateInfo) => {
  return userRepo.setUser(userId, updateInfo);
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
