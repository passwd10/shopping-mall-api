import request from 'supertest';
import mongoose from 'mongoose';

import products from '../../mock-data/product.js';
import Product from '../../models/productSchema';

import app from '../../index';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeAll(async () => {
  await Product.deleteMany({});
})

afterAll(async () => {
  await mongoose.disconnect();
})

describe('GET /products', () => {
  let searchKey = '';

  beforeEach(async () => {
    await Product.insertMany(products);
  })

  afterEach(async () => {
    await Product.deleteMany({});
  })

  describe('with existing products', () => {
    beforeEach(async () => {
      searchKey = await products[0].title;
    })

    it('responds user data', async () => {
      await request(app)
        .get('/products/search/?q=' + encodeURI(searchKey))
        .expect(200);
    })
  })

  describe('with not existing product', () => {
    beforeEach(async () => {
      searchKey = await '교과서';
    })

    it('responds user data', async () => {
      await request(app)
        .get('/products/search/?q=' + encodeURI(searchKey))
        .expect(400);
    })
  })
})