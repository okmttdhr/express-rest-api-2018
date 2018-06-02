// @flow
import Sequelize from 'sequelize';
import {isObject, isEmpty} from 'lodash';

export const likeQuery = (str: string) => {
  return {[(Sequelize.Op.like: any)]: `%${str}%`};
};

export class WhereBuilder {
  query: Object;

  constructor() {
    this.query = {};
  }

  equalQuery(name: any, q: any, modifier: (q: any) => any = o => o) {
    if (q == null) return;
    const query = modifier(q);
    this.pushQuery(name, query);
  }

  isNullQuery(name: any) {
    this.pushQuery(name, null);
  }

  opQuery(name: any, op: Object, q: any, modifier: (q: any) => any = o => o) {
    if (q == null) return;
    const query: Object = {};
    query[op] = modifier(q);
    this.pushQuery(name, query);
  }

  likeQuery(name: any, q: string, modifier: (q: any) => any = o => o) {
    if (q == null) return;
    const query = modifier(q);
    this.pushQuery(name, likeQuery(query));
  }

  pushQuery(name: any, query: any) {
    if (!this.query[name]) {
      this.query[name] = query;
      return;
    }

    if (isObject(this.query[name])) {
      this.query[name] = Object.assign({}, this.query[name], query);
      return;
    }

    if (!Array.isArray(this.query[name])) {
      this.query[name] = [this.query[name]];
    }
    this.query[name].push(query);
  }

  addQuery(query: any) {
    this.query = Object.assign({}, this.query, query);
  }

  removeQuery(name: string) {
    delete this.query[name];
  }

  hasWhere() {
    return !isEmpty(this.query);
  }

  generateQuery() {
    return this.query;
  }
}

export const createWhereBuilder = () => {
  return new WhereBuilder();
};
