// @flow

const len = (name: string, range: [number, number]) => {
  const msg = range[0] === range[1]
    ? `${name} should not be more than ${range[0]} characters in length.`
    : `${name} should be between ${range[0]} and ${range[1]} characters in length.`;
  return {
    msg,
    args: range,
  };
};
const notEmpty = (name: string) => {
  return {
    msg: `${name} is required.`,
  };
};
const isInt = (name: string) => {
  return {
    msg: `${name} must be numeric.`,
  };
};

export default {
  len,
  notEmpty,
  isInt,
};
