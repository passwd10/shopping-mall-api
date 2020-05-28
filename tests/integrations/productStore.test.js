import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../index';

import products from '../../mock-data/product.js'
import Product from '../../models/productSchema';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeAll(async () => {
  await Product.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
})

describe('GET /productStore', () => {
  describe('with existing products in store', () => {
    beforeEach(async () => {
      await Product.insertMany(products);
    });

    afterEach(async () => {
      await Product.deleteMany({});
    });

    it('responds with 200 valid products', async () => {
      await request(app)
        .get('/productStore').expect(200);
    });
  });

  describe('with not existing product in store', () => {
    it('responds with 404 if invalid products', async () => {
      await request(app)
        .get('/productStore').expect(404)
    });
  });
})

describe('GET /productStore/:id', () => {
  describe('with existing products in store', () => {
    beforeEach(async () => {
      await Product.insertMany(products);
    });

    afterEach(async () => {
      await Product.deleteMany({});
    });

    it('responds with 200 if valid products', async () => {
      await request(app)
        .get('/productStore/1').expect(200)
    });
  });

  describe('with not existing products in store', () => {
    it('responds with 404 if invalid products', async () => {
      await request(app)
        .get('/productStore/1').expect(404)
    });
  });
})

describe('POST /productStore', () => {
  let item = {};
  beforeEach(async () => {
    await Product.insertMany(products);
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });
  
  describe('with existing products in store', () => {
    beforeEach(() => {
      item = {
        title: "땅콩과자", categoryId: 1, categoryName: "견과류", detail: "땅콩과자!", img: "", price: 5000
      }
    })

    it('responds with 200 valid products', async () => {
      await request(app)
        .post('/productStore')
        .send({ item })
        .expect(200)
    });
  });
})