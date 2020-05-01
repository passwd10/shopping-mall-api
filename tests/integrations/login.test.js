import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../index';

import users from '../../mock-data/user.json';
import User from '../../models/userSchema';

describe('Login', ()=>{
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  })

  beforeAll(async () => {
    await User.deleteMany({});
  })
  
  beforeEach(async () => {
    await User.insertMany(users);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  })
  
  describe('POST /login', () => {
    let userId = '';
    let userPasswd = '';
  
    describe('with existing user', () => {
      beforeEach(() => {
        userId = users[0].userId;
        userPasswd = users[0].password;
      })
  
      afterEach(async () => {
        await request(app).delete('/login')
      })

      it('responds user data', async () => {
        await request(app).post('/login')
          .send({ userId, userPasswd })
          .expect(200);
      });
    })
  
    describe('with not existing id', () => {
      beforeEach(() => {
        userId = 'NOT_EXISTING';
        userPasswd = users[0].password;
      });
  
      it('responds 400 error with message', async () => {
        await request(app).post('/login')
          .send({ userId, userPasswd })
          .expect(400);
      });
    });
  
    describe('with wrong password', () => {
      beforeEach(() => {
        userId = users[0].userId;
        userPasswd = 'WRONG_PASSWORD';
      });
  
      it('responds 400 error with message', async () => {
        await request(app).post('/login')
          .send({ userId, userPasswd })
          .expect(400);
      });
    });
  });
  
  describe('Delete /login', () => {
    describe('with existing user', () => {
      it('responds clearing cookie', async () => {
        await request(app).delete('/login')
          .expect(200);
      });
    });
  });
})
