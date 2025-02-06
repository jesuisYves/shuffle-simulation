'use strict';

const wrap = (...fns) => {
  const master = fns.pop();
  return (...args) => {
    for (const fn of fns) {
      fn(...args);
    }
    return master(...args);
  };
};

module.exports = { wrap };
