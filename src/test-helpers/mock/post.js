// @flow
import g from './mock-generator';
import {db} from '../../models';

const builder = (i: number = 0) => {
  return {
    id: i + 1,
    title: `TITLE${i}`,
    body: `BODY${i}`,
  };
};

export default g.exportAll(builder, db.Post);
