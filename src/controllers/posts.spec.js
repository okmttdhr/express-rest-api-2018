// @flow
import {omit} from 'lodash';
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
  describe('detail', () => {
    beforeEach(async () => {
      await mock.post.single();
    });
    it('could get a post', async () => {
      await request(app)
        .get('/posts/1')
        .expect(200)
        .then((r) => {
          assert.deepEqual(omit(r.body, ['created_at', 'updated_at']), {
            id: 1,
            title: 'TITLE0',
            body: 'BODY0',
          });
        })
      ;
    });

    describe('validation', () => {
      it('could check if it is invalid', async () => {
        await request(app)
          .get('/posts/invalid')
          .expect(400, {
            message: 'Invalid parameters',
            errors: {
              id: 'ID must be numeric.',
            },
          })
        ;
      });
    });
  });
  describe('index', () => {
    beforeEach(async () => {
      await mock.post.multi();
    });
    it('could get posts', async () => {
      await request(app)
        .get('/posts')
        .expect(200)
        .then((r) => {
          assert.deepEqual(omit(r.body, ['posts']), {
            current_page: 1,
            total_count: 5,
            total_page: 1,
          });
          [4, 3, 2, 1, 0].forEach((n, i) => {
            assert.deepEqual(omit(r.body.posts[i], ['created_at', 'updated_at']), {
              id: n + 1,
              title: `TITLE${n}`,
              body: `BODY${n}`,
            });
          });
        })
      ;
    });
    it('pagination', async () => {
      await request(app)
        .get('/posts?page=2&per_page=2')
        .expect(200)
        .then((r) => {
          assert.deepEqual(omit(r.body, ['posts']), {
            current_page: 2,
            total_count: 5,
            total_page: 3,
          });
          [2, 1].forEach((n, i) => {
            assert.deepEqual(omit(r.body.posts[i], ['created_at', 'updated_at']), {
              id: n + 1,
              title: `TITLE${n}`,
              body: `BODY${n}`,
            });
          });
        })
      ;
    });
    it('order', async () => {
      await request(app)
        .get('/posts?order=desc&order_key=title')
        .expect(200)
        .then((r) => {
          const ids = r.body.posts.map(p => p.id);
          assert.deepEqual(ids, [5, 4, 3, 2, 1]);
        })
      ;
    });

    describe('validation', () => {
      it('could check if it is invalid', async () => {
        await request(app)
          .get('/posts?page=invalid&per_page=invalid&order=invalid&order_key=invalid')
          .expect(400, {
            message: 'Invalid parameters',
            errors: {
              order: 'Invalid Order.',
              order_key: 'Invalid Order-key.',
              page: 'Page must be numeric.',
              per_page: 'Per-page must be numeric.',
            },
          })
        ;
      });
    });
  });
});
