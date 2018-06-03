// @flow
import type {$Response} from 'express';
import {validationResult} from 'express-validator/check/index';
import {SEQUELIZE_UNIQUE_CONSTRAINT_ERROR, SEQUELIZE_VALIDATION_ERROR} from '../constants';

const createPaginationResponse = (page: number, perPage: number, totalCount: number) => {
  if (totalCount < perPage) {
    return {
      total_count: totalCount,
      current_page: 1,
      total_page: 1,
    };
  }
  return {
    total_count: totalCount,
    total_page: totalCount % perPage === 0 ?
      totalCount / perPage : (Math.floor(totalCount / perPage)) + 1,
    current_page: page,
  };
};

const invalidFormat = (res: $Response, status: number, message: string = '', errors: Object = {}) => {
  res
    .status(status)
    .send({message, errors});
};

const responseBadRequest = (res: $Response, errors: Object = {}) => {
  invalidFormat(res, 400, 'Invalid parameters', errors);
};

const responseNotFound = (res: $Response, errors: Object = {}) => {
  invalidFormat(res, 404, 'Not Found', errors);
};

const responseInternalServerError = (
  res: $Response,
  errorForLog: Object,
  errors: Object = {},
) => {
  invalidFormat(
    res,
    500,
    'The server encountered an error and was unable to complete your request. Please try again later.',
    errors,
  );
};

const responseJson = (res: $Response, json: Object) => {
  res.status(200).send(json);
};

const responseOK = (res: $Response) => {
  res.status(200).send({message: 'OK'});
};

const responseCreated = (res: $Response, createdId: number) => {
  res.status(201).send({message: 'OK', id: createdId});
};

const getErrorResponse = (error: Object) => {
  const res = {};
  error.errors.forEach((e) => {
    res[e.path] = e.message;
  });
  return res;
};

const getParameterErrorResponse = (errors: Array<any>) => {
  const res = {};
  errors.forEach((e) => {
    res[e.param] = e.msg;
  });
  return res;
};

const handleSequelizeError = (res: $Response, error: Object) => {
  if (
    error.name === SEQUELIZE_VALIDATION_ERROR ||
    error.name === SEQUELIZE_UNIQUE_CONSTRAINT_ERROR
  ) {
    responseBadRequest(
      res,
      getErrorResponse(error),
    );
    return true;
  }
  return false;
};

const handleParameterError = (req: Object, res: $Response) => {
  const parameterError = validationResult(req);
  if (!parameterError.isEmpty()) {
    responseBadRequest(
      res,
      getParameterErrorResponse(parameterError.array()),
    );
    return true;
  }
  return false;
};

const handleNotUpdated = (
  result: ?Array<Number>,
  res: $Response,
) => {
  const notUpdated = () => {
    if (result == null) return false;
    const affectedRow = result[0];
    return affectedRow === 0;
  };
  if (notUpdated(result)) {
    responseNotFound(res);
    return true;
  }
  return false;
};

export default {
  createPaginationResponse,
  invalidFormat,
  responseBadRequest,
  responseNotFound,
  responseInternalServerError,
  responseOK,
  getParameterErrorResponse,
  handleSequelizeError,
  handleParameterError,
  handleNotUpdated,
  responseCreated,
  responseJson,
};
