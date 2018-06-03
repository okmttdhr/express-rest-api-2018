// @flow
import type { $Request, $Response } from 'express';
import {response, query} from '../services';
import {db} from '../models';
import {createWhereBuilder} from './common/';

const create = async (req: $Request, res: $Response) => {
  try {
    if (response.handleParameterError(req, res)) {
      return;
    }
    const {body} = (req: Object);
    const post = await db.Post.create({
      title: body.title,
      body: body.body,
    });

    response.responseCreated(res, post.id);
  } catch (e) {
    if (response.handleSequelizeError(res, e)) {
      return;
    }
    response.responseInternalServerError(res, e);
  }
};

const update = async (req: $Request, res: $Response) => {
  try {
    if (response.handleParameterError(req, res)) {
      return;
    }
    const {body} = (req: Object);
    const post = await db.Post.create({
      title: body.title,
      body: body.body,
    }, {where: {id: req.params.id}});

    if (response.handleNotUpdated(post, res)) {
      return;
    }

    response.responseOK(res);
  } catch (e) {
    if (response.handleSequelizeError(res, e)) {
      return;
    }
    response.responseInternalServerError(res, e);
  }
};

const detail = async (req: $Request, res: $Response) => {
  try {
    if (response.handleParameterError(req, res)) {
      return;
    }

    const post = await db.Post.findById(req.params.id);

    if (!post) {
      response.responseNotFound(res, 'Post');
      return;
    }

    response.responseJson(res, {
      id: post.id,
      title: post.title,
      body: post.body,
      created_at: post.created_at,
      updated_at: post.updated_at,
    });
  } catch (e) {
    response.responseInternalServerError(res, e);
  }
};

const index = async (req: $Request, res: $Response) => {
  try {
    if (response.handleParameterError(req, res)) {
      return;
    }

    const q = (req: Object).query;
    const postsWhere = createWhereBuilder();
    postsWhere.likeQuery('title', q.title);
    postsWhere.likeQuery('body', q.body);

    const {limit, offset, page, perPage} = query.createPaginationQuery(req);
    const posts = await db.Post.findAndCountAll({
      where: postsWhere.generateQuery(),
      offset,
      limit,
      order: query.createOrderQuery(req),
    });

    if (posts.rows.length === 0) {
      response.responseNotFound(res, 'Posts');
      return;
    }

    response.responseJson(res, Object.assign(
      {},
      {
        posts: posts.rows.map((post) => {
          return {
            id: post.id,
            title: post.title,
            body: post.body,
            created_at: post.created_at,
            updated_at: post.updated_at,
          };
        }),
      },
      response.createPaginationResponse(page, perPage, posts.count),
    ));
  } catch (e) {
    response.responseInternalServerError(res, e);
  }
};

export default {
  create,
  update,
  detail,
  index,
};
