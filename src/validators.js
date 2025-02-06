'use strict';

const validateEntity = (iface, value) => {
  if (!iface.validate(value))
    throw new Error(iface.message);
};

const validateArguments = (ifaces, ...args) => {
  for (let i = 0; i < ifaces.length; i++) {
    const iface = ifaces[i];
    if (typeof iface === 'function') {
      iface(args);
    } else {
      const entity = args[i];
      validateEntity(iface, entity);
    }
  }
};

module.exports = {
  validateEntity,
  validateArguments,
};
