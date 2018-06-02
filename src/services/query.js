// @flow
const createPaginationQuery = (req: Object) => {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PER_PAGE = 20;
  const page = req.query.page ? Number(req.query.page) : DEFAULT_PAGE;
  const perPage = req.query.per_page ? Number(req.query.per_page) : DEFAULT_PER_PAGE;
  return {
    page,
    perPage,
    offset: (page - 1) * perPage,
    limit: perPage,
  };
};

const addUniqueColumnToFinalOrderKey = (orderKeys: Array<Array<any>>) => {
  // for not unique column
  if (!orderKeys.some((key) => { return key[0] === 'id'; })) orderKeys.push(['id', 'desc']);
  return orderKeys;
};

const createOrderQueryByParam = (orderKey: string, order: string) => {
  const DEFAULT_ORDER_KEY = 'id';
  const DEFAULT_ORDER = 'desc';
  return addUniqueColumnToFinalOrderKey([[
    orderKey || DEFAULT_ORDER_KEY,
    order || DEFAULT_ORDER,
  ]]);
};

const createOrderQueryForAssociation = (
  model: Object | Array<Object>,
  orderKey: string,
  order: string,
) => {
  const models = Array.isArray(model) ? model : [model];
  const query = createOrderQueryByParam(orderKey, order).map(q => models.concat(q));
  return addUniqueColumnToFinalOrderKey(query);
};

const createOrderQuery = (req: Object) => {
  return createOrderQueryByParam(req.query.order_key, req.query.order);
};

export default {
  createOrderQuery,
  createOrderQueryForAssociation,
  createPaginationQuery,
};
