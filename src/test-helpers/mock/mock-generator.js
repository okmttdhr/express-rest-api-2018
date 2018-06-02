// @flow
import {range} from 'lodash';

type Model = {
  build(o: Object): Object;
  bulkCreate(os: Array<Object>): Object;
  all(): Object;
};

type Builder = (i: number) => Object;

export type ModifierFunc = (i: number, o: Object) => Object;

export type Modifier = Object | ModifierFunc;

const modifierFunc = (mo: Modifier) => {
  if (typeof mo === 'function') return mo;
  return (i, o) => Object.assign({}, o, (mo: Object));
};

export const removePK = (i: number, o: Object) => {
  if (o.id === undefined) { return o; }
  const ret = o;
  delete ret.id;
  return ret;
};

export const mergeModifier = (m1: Modifier, m2: Modifier) => {
  const f1 = modifierFunc(m1);
  const f2 = modifierFunc(m2);
  return (i: number, o: Object) => {
    return f2(i, f1(i, o));
  };
};

const buildArgs = (builder: Builder, i:number, modifier: Modifier) => {
  const f = modifierFunc(modifier);
  return f(i, builder(i));
};

const singleM = (
  builder: Builder,
  model: Model,
  i: number,
  modifier: Modifier = {},
) => {
  return model.build(buildArgs(builder, i, modifier));
};

const multiM = (
  builder: Builder,
  model: Model,
  _range: number = 5,
  modifier: Modifier = {},
) => range(_range).map(i => singleM(builder, model, i, modifier));

const single = (
  builder: Builder,
  model: Model,
  i: number,
  modifier: Modifier = {},
) =>
  singleM(builder, model, i, modifier)
    .save()
    .catch(err => console.log(err));

const multi = (
  builder: Builder,
  model: Model,
  _range: number = 5,
  modifier: Modifier = {},
) =>
  model
    .bulkCreate(range(_range).map(i => buildArgs(builder, i, modifier)))
    .then(() => model.all())
    .catch(err => console.log(err));

const exportSingleM = (builder: Builder, model: Model) =>
  (i: number = 0, modifier: Modifier = {}) => singleM(builder, model, i, modifier);

const exportMultiM = (builder: Builder, model: Model) =>
  (_range: number = 5, modifier: Modifier) => multiM(builder, model, _range, modifier);

const exportSingle = (builder: Builder, model: Model) =>
  (i: number = 0, modifier: Modifier = {}) => single(builder, model, i, modifier);

const exportMulti = (builder: Builder, model: Model) =>
  (_range: number = 5, modifier: Modifier = {}) => multi(builder, model, _range, modifier);

const exportAll = (builder: Builder, model: Model) => {
  return {
    single: exportSingle(builder, model),
    multi: exportMulti(builder, model),
    singleM: exportSingleM(builder, model),
    multiM: exportMultiM(builder, model),
  };
};

export default {
  exportAll,
};
