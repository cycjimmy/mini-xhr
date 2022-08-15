import { objectIterate } from './tools';

/**
 * XMLHttpRequest
 * @param method  default 'GET'
 * @param url
 * @param timeout
 * @param ontimeoutCB
 * @param dataType  default 'json'
 * @param data
 * @param formData
 * @param contentType default 'application/x-www-form-urlencoded; charset=UTF-8'
 * @param headers default {}
 * @param success
 * @param fail
 * @returns {XMLHttpRequest}
 * @private
 */
export default ({
  method = 'GET',
  url,
  timeout = 0,
  ontimeoutCB = null,
  dataType = 'json',
  data,
  formData,
  contentType = 'application/x-www-form-urlencoded; charset=UTF-8',
  headers = {},
  success = () => {},
  fail = () => {},
}) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, method === 'GET' && data ? `${url}?${data}` : url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status >= 200 && xhr.status < 400) {
      success(xhr.response);
    } else {
      const { statusText, status } = xhr;
      fail({ statusText: status ? statusText : 'timeout', status });
    }
  };

  xhr.timeout = timeout;

  if (ontimeoutCB) {
    xhr.ontimeout = ontimeoutCB;
  }

  switch (dataType) {
    case 'json':
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      break;

    default:
      xhr.setRequestHeader('Accept', '*/*');
  }

  if (contentType) {
    xhr.setRequestHeader('Content-Type', contentType);
  }

  // set custom headers
  objectIterate(headers, (value, key) => {
    xhr.setRequestHeader(key, value);
  });

  if (formData) {
    xhr.send(formData);
  } else {
    xhr.send(data);
  }

  return xhr;
};
