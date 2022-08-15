import _XMLHttpRequest from './_XMLHttpRequest';
import { dataStringMakeUp, getGlobal } from './tools';

/**
 * get
 * @param url
 * @param dataType
 * @param data
 * @param contentType
 * @param headers
 * @param timeout
 * @param ontimeoutCB
 * @returns {Promise<any | never>}
 */
export const get = (
  url,
  {
    dataType = 'json', data = {}, headers = {}, contentType, timeout = 0, ontimeoutCB = null,
  } = {},
) => Promise.resolve().then(
  () => new Promise((resolve, reject) => {
    _XMLHttpRequest({
      method: 'GET',
      url,
      dataType,
      contentType,
      data: dataStringMakeUp(data),
      headers,
      timeout,
      ontimeoutCB,
      success: (res) => resolve(res),
      fail: (err) => reject(err),
    });
  }),
);

/**
 * post
 * @param url
 * @param dataType
 * @param data
 * @param contentType
 * @param headers
 * @param timeout
 * @param ontimeoutCB
 * @returns {Promise<any | never>}
 */
export const post = (
  url,
  {
    dataType = 'json', data = {}, headers = {}, contentType, timeout = 0, ontimeoutCB = null,
  } = {},
) => Promise.resolve().then(
  () => new Promise((resolve, reject) => {
    _XMLHttpRequest({
      method: 'POST',
      url,
      dataType,
      contentType,
      data: dataStringMakeUp(data),
      headers,
      timeout,
      ontimeoutCB,
      success: (res) => resolve(res),
      fail: (err) => reject(err),
    });
  }),
);

/**
 * upload
 * @param url
 * @param dataType
 * @param formData
 * @param headers
 * @param timeout
 * @param ontimeoutCB
 * @returns {Promise<unknown>}
 */
export const upload = (url, {
  dataType = 'json', formData, headers = {}, timeout = 0, ontimeoutCB = null,
} = {}) => Promise.resolve().then(
  () => new Promise((resolve, reject) => {
    _XMLHttpRequest({
      method: 'POST',
      url,
      dataType,
      contentType: '',
      formData,
      headers,
      timeout,
      ontimeoutCB,
      success: (res) => resolve(res),
      fail: (err) => reject(err),
    });
  }),
);

/**
 * jsonp
 * @param url
 * @param data
 * @param timeout
 * @returns {Promise<any | never>}
 */
export const jsonp = (url, { data = {}, timeout = 5e3 } = {}) => {
  const jsonpNameSpace = getGlobal();
  const STR_ERROR = 'error';
  const STR_TIMEOUT = 'timeout';

  return Promise.resolve().then(
    () => new Promise((resolve, reject) => {
      const oHead = document.querySelector('head');
      const oScript = document.createElement('script');
      const sData = dataStringMakeUp(data);

      oScript.src = url;
      oScript.type = 'text/javascript';

      const callbackName = `jsonp_${Math.random()}`.replace('.', '');

      function clearScript() {
        oHead.removeChild(oScript);
        clearTimeout(oScript.timer);
        jsonpNameSpace[callbackName] = null;
      }

      // jsonp callback function
      jsonpNameSpace[callbackName] = (json) => {
        clearScript();
        resolve(json);
      };

      // set oScript.src
      if (sData) {
        oScript.src += `?${sData}&callback=${callbackName}`;
      } else {
        oScript.src += `?callback=${callbackName}`;
      }

      // timeout handle
      if (timeout) {
        oScript.timer = setTimeout(() => {
          clearScript();
          reject(STR_TIMEOUT);
        }, timeout);
      }

      oScript.addEventListener('error', () => {
        clearScript();
        reject(STR_ERROR);
      });

      // send
      oHead.appendChild(oScript);
    }),
  );
};

export default {
  get,
  post,
  upload,
  jsonp,
};
