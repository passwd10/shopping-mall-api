import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../index';

describe('SignUp', () => {
  describe('GET /signUp/checkUserDuplicate', () => {
    describe('with existing duplicate', () => {
      it('responds with 200 if duplicate', async () => {
        await request(app).get('/signup/checkUserDuplicate')
      })
    })
  });
})

