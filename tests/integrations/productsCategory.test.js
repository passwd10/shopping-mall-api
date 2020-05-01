import request from 'supertest';
import mongoose from 'mongoose';

import categories from '../../mock-data/category.json';
import Category from '../../models/categorySchema';

import app from '../../index';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

afterAll(async () => {
  await mongoose.disconnect();
})

describe('GET /productsCategory', () => {
  beforeAll(async () => {
    await Category.deleteMany({});
  });

  describe('with existing productsCategory', () => {
    beforeEach(async () => {
      await Category.insertMany(categories);
    });

    afterEach(async () => {
      await Category.deleteMany({});
    });

    it('responds with 200 if valid category', async () => {
      await request(app).get('/productsCategory').expect(200);
    });
  });

  describe('with not existing productsCategory', () => {
    it('responds with 404 if invalid category', async () => {
      await request(app).get('/productsCategory').expect(404);
    });
  });
})