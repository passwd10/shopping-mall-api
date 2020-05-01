import request from 'supertest';
import app from '../index';

import users from '../mock-data/user.json';

// export const getSession = async () => {
//   const response = await (request(app).post('/login'))
//   .send({userId: users[0].userId, userPassword: users[0].userPassword});

// } 