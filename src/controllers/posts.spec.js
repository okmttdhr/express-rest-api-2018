// @flow
import request from 'supertest';
import assert from 'assert';
import {db} from '../models';
import {cleanDatabase} from '../test-helpers';
import mock from '../test-helpers/mock';
import {app} from '../app';

describe('Posts API', () => {
  beforeEach(async () => {
    await cleanDatabase();
  });
  describe('create', () => {
    it('could create a post', async () => {
      await request(app)
        .post('/posts')
        .send({title: 'title', body: 'body'})
        .expect(201, {
          message: 'OK',
          id: 1,
        })
        .then(async () => {
          const post = await db.Post.find();
          assert.equal(post.title, 'title');
          assert.equal(post.body, 'body');
        })
      ;
    });

    describe('validation', () => {
      it('could check if it exists', async () => {
        await request(app)
          .post('/posts')
          .send({})
          .expect(400, {
            message: 'Invalid parameters',
            errors: { title: 'Title is required.', body: 'Body is required.' },
          })
        ;
      });
      it('could check if it is invalid', async () => {
        await request(app)
          .post('/posts')
          .send({title: 't'.repeat(26), body: 'b'.repeat(256)})
          .expect(400, {
            message: 'Invalid parameters',
            errors: {
              title: 'Title should be between 1 and 25 characters in length.',
              body: 'Body should be between 1 and 255 characters in length.',
            },
          })
        ;
      });
    });
  });
  describe('update', () => {
    beforeEach(async () => {
      await mock.post.single();
    });
    it('could update a post', async () => {
      await request(app)
        .put('/posts/1')
        .send({title: 'title', body: 'body'})
        .expect(200)
        .then(async () => {
          const post = await db.Post.findById(1);
          assert.equal(post.title, 'title');
          assert.equal(post.body, 'body');
        })
      ;
    });

    describe('validation', () => {
      it('could check if it exists', async () => {
        await request(app)
          .put('/posts/1')
          .send({})
          .expect(400, {
            message: 'Invalid parameters',
            errors: { title: 'Title is required.', body: 'Body is required.' },
          })
        ;
      });
      it('could check if it is invalid', async () => {
        await request(app)
          .put('/posts/1')
          .send({title: 't'.repeat(26), body: 'b'.repeat(256)})
          .expect(400, {
            message: 'Invalid parameters',
            errors: {
              title: 'Title should be between 1 and 25 characters in length.',
              body: 'Body should be between 1 and 255 characters in length.',
            },
          })
        ;
      });
    });
  });
});
