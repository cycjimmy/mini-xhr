/**
 * objectIterate
 * @param obj
 * @param fn
 */
export const objectIterate = (obj, fn) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      fn.call(null, obj[key], key, obj);
    }
  }
};

/**
 * Data String Make Up
 * @param data
 * @returns {string}
 */
export const dataStringMakeUp = (data = {}) => {
  // set data string
  let sData = '';

  objectIterate(data, (value, key) => {
    let prefix = '';

    if (sData) {
      // not first key
      prefix = '&';
    }

    sData += `${prefix + key}=${value}`;
  });

  return sData;
};

/**
 * get Global
 * @returns {any}
 */
export const getGlobal = () => (typeof window === 'undefined' ? global : window);
