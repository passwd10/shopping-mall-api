import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../index';

import users from '../../mock-data/user.json';
import products from '../../mock-data/product.json'
import User from '../../models/userSchema';
import Product from '../../models/productSchema';

describe('CartList', () => {

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/test', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  beforeAll(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});
  });

  beforeEach(async () => {
    await User.insertMany(users);
    await Product.insertMany(products);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET /CartList', () => {
    describe('with existing user', () => {
      let cookie = '';

      beforeEach(async () => {
        const data = await request(app).post('/login')
          .send({
            userId: users[0].userId,
            userPasswd: users[0].password
          })
        cookie = data.headers['set-cookie'];
      });

      afterEach(async () => {
        await request(app).delete('/login')
      })

      it('responds 200 if valid cart', async () => {
        await request(app)
          .get('/cartList')
          .set('Cookie', cookie)
          .expect(200);
      });
    });
  });

  describe('POST /CartList', () => {
    describe('with existing user', () => {
      let cookie = '';
      let productId = '';

      beforeEach(async () => {
        const data = await request(app).post('/login')
          .send({
            userId: users[0].userId,
            userPasswd: users[0].password
          })
        cookie = data.headers['set-cookie'];
        productId = products[0].id
      });

      afterEach(async () => {
        await request(app).delete('/login')
      })

      it('responds 200 if valid cart', async () => {
        await request(app)
          .post('/cartList')
          .send({ productId })
          .set('Cookie', cookie)
          .expect(200);
      });
    });
  });

  describe('DELETE /CartList', () => {
    describe('with existing user', () => {
      let cookie = '';
      let productId = '';

      beforeEach(async () => {
        const data = await request(app).post('/login')
          .send({
            userId: users[0].userId,
            userPasswd: users[0].password
          })
        cookie = data.headers['set-cookie'];
        productId = products[0].id
      });

      afterEach(async () => {
        await request(app).delete('/login')
      })

      it('responds 200 if valid cart', async () => {
        await request(app)
          .delete('/cartList')
          .send({ productId })
          .set('Cookie', cookie)
          .expect(200);
      });
    });
  });

});