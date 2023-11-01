import { expect } from 'chai';
import app from './app.js';
import request from 'supertest';
import pLimit from 'p-limit';

describe('Update Balance', function () {
  this.timeout(1500000);
  it('Should update balance successfully for 5000 requests', async function () {
    const userId = 1;
    const amount = -2;
    let successfulRequests = 0;
    const limit = pLimit(5); // Устанавливаем лимит в 100 одновременных запросов

    const promises = [];

    for (let i = 0; i < 5000; i++) {
      const promise = limit(async () => {
        const res = await request(app)
          .put('/updateBalance')
          .send({ userId, amount });
        
        if (res.status === 200) {
          successfulRequests++;
        }
      });
      promises.push(promise);
    }

    return Promise.all(promises)
      .then(() => {
        expect(successfulRequests).to.equal(5000);
      });
  });

  it('Should handle insufficient funds for 5000 requests', async function () {
    const userId = 1;
    const amount = -2;
    let errorRequests = 0;
    const limit = pLimit(5); // Устанавливаем лимит в 100 одновременных запросов

    const promises = [];
    for (let i = 0; i < 5000; i++) {
      const promise = limit(async () => {
        const res = await request(app)
          .put('/updateBalance')
          .send({ userId, amount });
        
        if (res.status !== 200) {
          errorRequests++;
        }
      });
      promises.push(promise);
    }

    return Promise.all(promises)
      .then(() => {
        expect(errorRequests).to.equal(5000);
      });
  });
});
