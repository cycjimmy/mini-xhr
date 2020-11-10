/**
 * XMLHttpRequest
 * @param method  default 'GET'
 * @param url
 * @param timeout
 * @param ontimeoutCB
 * @param dataType  default 'json'
 * @param data
 * @param contentType default 'application/x-www-form-urlencoded; charset=UTF-8'
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
  contentType = 'application/x-www-form-urlencoded; charset=UTF-8',
  success = () => {},
  fail = () => {}
}) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, method === 'GET' ? `${url}?${data}` : url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status >= 200 && xhr.status < 400) {
      success(xhr.response);
    } else {
      fail(new Error(xhr.statusText));
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

  xhr.setRequestHeader('Content-Type', contentType);
  xhr.send(data);

  return xhr;
};
