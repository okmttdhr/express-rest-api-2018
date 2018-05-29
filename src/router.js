// @flow
import express from 'express';
import C from './controllers';
import {parameterValidator as V} from './middlewares';

const router = express.Router();

router.post('/posts', V.posts.create, C.posts.create);
router.get('/posts', V.posts.index, C.posts.index);
router.get('/posts/:id', V.posts.detail, C.posts.detail);
router.put('/posts/:id', V.posts.update, C.posts.update);

module.exports = router;
