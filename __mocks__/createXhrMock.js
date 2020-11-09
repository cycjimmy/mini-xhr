export default ({
                  response = '',
                  readyState = 4,
                  status = 200,
                  statusText = '',
                } = {}) => {
  const open = jest.fn();
  let onload = jest.fn();
  let onerror = jest.fn();
  let setRequestHeader = jest.fn();

  const send = jest.fn().mockImplementation(function () {
    onload = this.onload.bind(this);
    onerror = this.onerror.bind(this);
    setRequestHeader = this.setRequestHeader.bind(this);
    this.onreadystatechange();

    if (!this.timeout) {
      return;
    }

    setTimeout(() => {
      if (this.ontimeout) {
        this.ontimeout();
      }
    }, this.timeout);
  });

  const xhrMockClass = () => ({
    open,
    send,
    onload,
    onerror,
    setRequestHeader,
    response,
    readyState,
    status,
    statusText,
  });

  window.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass);

  return xhrMockClass;
};

