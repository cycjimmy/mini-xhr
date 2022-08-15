import { objectIterate, paramsStringMakeUp } from './tools';

/**
 * XMLHttpRequest
 * @param method  default 'GET'
 * @param url
 * @param timeout
 * @param ontimeoutCB
 * @param params
 * @param dataType 'json'(default) || 'formData' || 'text'
 * @param data
 * @param formData
 * @param responseType 'arraybuffer' || 'document' || 'json'(default) ||
 *                     'text' || 'stream' || 'blob'
 * @param contentType default 'application/json; charset=UTF-8'
 * @param headers default {}
 * @param success
 * @param fail
 * @returns {XMLHttpRequest}
 */
export default ({
  method = 'GET',
  url,
  timeout = 0,
  ontimeoutCB = null,
  params = {},
  dataType = 'json',
  data,
  responseType = 'json',
  contentType = 'application/json; charset=UTF-8',
  headers = {},
  success = () => {},
  fail = () => {},
}) => {
  const xhr = new XMLHttpRequest();
  const sParams = paramsStringMakeUp(params);
  xhr.open(
    method,
    sParams ? `${url}?${paramsStringMakeUp(params)}` : url,
    true,
  );
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

  xhr.responseType = responseType;

  if (contentType) {
    xhr.setRequestHeader('Content-Type', contentType);
  }

  // set custom headers
  objectIterate(headers, (value, key) => {
    xhr.setRequestHeader(key, value);
  });

  switch (dataType) {
    case 'json':
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send(JSON.stringify(data));
      break;

    case 'text':
    case 'formData':
      xhr.setRequestHeader('Accept', '*/*');
      xhr.send(data);
      break;

    default:
      xhr.send(data);
  }

  return xhr;
};
