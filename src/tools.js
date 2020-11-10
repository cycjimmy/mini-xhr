/**
 * Data String Make Up
 * @param data
 * @returns {string}
 * @private
 */
export const dataStringMakeUp = (data = {}) => {
  // set data string
  let sData = '';

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      let prefix = '';

      if (sData) {
        // not first key
        prefix = '&';
      }

      sData += `${prefix + key}=${data[key]}`;
    }
  }

  return sData;
};

/**
 * get Global
 * @returns {any}
 * @private
 */
export const getGlobal = () => (typeof window === undefined ? global : window);
