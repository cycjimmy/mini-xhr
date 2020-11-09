import _XMLHttpRequest from './_XMLHttpRequest';
import { dataStringMakeUp, getGlobal } from './tools';

/**
 * get
 * @param url
 * @param dataType
 * @param data
 * @param contentType
 * @param timeout
 * @param ontimeoutCB
 * @returns {Promise<any | never>}
 */
export const get = (
  url,
  { dataType = 'json', data = {}, contentType, timeout = 0, ontimeoutCB = null } = {}
) =>
  Promise.resolve().then(
    () =>
      new Promise((resolve, reject) =>
        _XMLHttpRequest({
          method: 'GET',
          url,
          dataType,
          contentType,
          data: dataStringMakeUp(data),
          timeout,
          ontimeoutCB,
          success: (res) => resolve(res),
          fail: (err) => reject(err)
        })
      )
  );

/**
 * post
 * @param url
 * @param dataType
 * @param data
 * @param contentType
 * @param timeout
 * @param ontimeoutCB
 * @returns {Promise<any | never>}
 */
export const post = (
  url,
  { dataType = 'json', data = {}, contentType, timeout = 0, ontimeoutCB = null } = {}
) =>
  Promise.resolve().then(
    () =>
      new Promise((resolve, reject) =>
        _XMLHttpRequest({
          method: 'POST',
          url,
          dataType,
          data: dataStringMakeUp(data),
          contentType,
          timeout,
          ontimeoutCB,
          success: (res) => resolve(res),
          fail: (err) => reject(err)
        })
      )
  );

/**
 * jsonp
 * @param url
 * @param data
 * @param timeout
 * @returns {Promise<any | never>}
 */
export const jsonp = (url, { data = {}, timeout = 0 } = {}) => {
  const jsonpNameSpace = getGlobal();

  return Promise.resolve().then(
    () =>
      new Promise((resolve, reject) => {
        const oHead = document.querySelector('head');
        const oScript = document.createElement('script');
        const sData = dataStringMakeUp(data);

        oScript.src = url;
        oScript.type = 'text/javascript';

        const callbackName = `jsonp_${Math.random()}`.replace('.', '');

        // jsonp callback function
        jsonpNameSpace[callbackName] = (json) => {
          // clean oScript
          oHead.removeChild(oScript);
          clearTimeout(oScript.timer);
          jsonpNameSpace[callbackName] = null;

          // resolve
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
            // clean oScript
            oHead.removeChild(oScript);
            jsonpNameSpace[callbackName] = null;

            // reject err
            reject(new Error('timeout'));
          }, timeout);
        }

        // send
        oHead.appendChild(oScript);
      })
  );
};

export default {
  get,
  post,
  jsonp
};
