import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../index';

import users from '../../mock-data/user.json';
import User from '../../models/userSchema';

describe('User', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

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
  });

  describe('GET /user', () => {
    describe('with existing session', () => {
      let cookie = '';

      beforeEach(async () => {
        const data = await request(app).post('/login')
          .send({
            userId: users[0].userId,
            userPasswd: users[0].password,
          });

        cookie = data.headers['set-cookie'];
      })

      it('responds with 200 if valid session', async () => {
        const { body } = await request(app).get('/user')
          .set('Cookie', cookie)
          .expect(200);

        expect(body.userId).toBe(users[0].userId);
      });
    });

    describe('with no existing session', () => {
      it('responds with 400 if invalid session', async () => {
        await request(app).get('/user').expect(400);
      });
    });
  });

  describe('PATCH /user', () => {
    describe('with existing session', () => {
      let cookie = '';
      let updateInfo = { name: '홍길동' };

      beforeEach(async () => {
        const data = await request(app).post('/login')
          .send({
            userId: users[0].userId,
            userPasswd: users[0].password,
          });

        cookie = data.headers['set-cookie'];
      })

      it('responds with 200 if valid session', async () => {
        const { body } = await request(app).patch('/user')
          .set('Cookie', cookie)
          .send(updateInfo)
          .expect(200);

        expect(body.userId)
      });
    });
  });
});