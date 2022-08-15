# Mini XHR
![][workflows-badge-image]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![rollup][rollup-image]][rollup-url]
[![semantic-release][semantic-image]][semantic-url]
[![jest][jest-image]][jest-url]
[![npm license][license-image]][download-url]

A very lightweight javascript library for HTTP requests.

Language: [En][Readme-url-En] | [中文][Readme-url-ZhCN]
***

## Install
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# via npm
$ npm install @cycjimmy/mini-xhr --save

# or via yarn
$ yarn add @cycjimmy/mini-xhr
```

## Usage
```javascript
import miniXhr from '@cycjimmy/mini-xhr';

# OR
const miniXhr = require('@cycjimmy/mini-xhr');

miniXhr.get(url [, settings])
  .then((data) => {
    // handle data
  })
  .catch((err) => {
    // handle error
  });
```

### miniXhr supports the following methods:
#### `miniXhr.get(url, [,settings])`
* `url`: [Require][String] The server URL that will be used for the request.
* The `settings` supports: [Option][Object]
  * `data`: [Option][Object] The key-value pair for the URL parameters to be sent with the request. Default `{}`.
  * `dataType`: [Option][String] The type of data that the server will respond with. Default `'json'`.
  * `contentType`: [Option][String] Content type. Default `'application/x-www-form-urlencoded; charset=UTF-8'`.
  * `headers`: [Option][Object] The key-value pair that custom headers to be sent. Default `{}`.
  * `timeout`: [Option][Number] The number of milliseconds before the request times out. A value of 0 means there will be no timeout. Default `0`.
  * `timeoutCB`: [Option][Function] The time-out callback function. Default `null`.
  
#### `miniXhr.post(url, [,settings])`
* `url`: [Require][String] The server URL that will be used for the request.
* The `settings` supports: [Option][Object]
  * `data`: [Option][Object] The key-value pair for the data to be sent as the request body. Default `{}`.
  * `dataType`: [Option][String] The type of data that the server will respond with. Default `'json'`.
  * `contentType`: [Option][String] Content type. Default `'application/x-www-form-urlencoded; charset=UTF-8'`.
  * `headers`: [Option][Object] The key-value pair that custom headers to be sent. Default `{}`.
  * `timeout`: [Option][Number] The number of milliseconds before the request times out. A value of 0 means there will be no timeout. Default `0`.
  * `timeoutCB`: [Option][Function] The time-out callback function. Default `null`.

#### `miniXhr.upload(url, [,settings])`
* `url`: [Require][String] The server URL that will be used for the request.
* The `settings` supports: [Option][Object]
  * `formData`: [Option][FormData] The fromData to be sent as the request body. Default `undefined`.
  * `dataType`: [Option][String] The type of data that the server will respond with. Default `'json'`.
  * `headers`: [Option][Object] The key-value pair that custom headers to be sent. Default `{}`.
  * `timeout`: [Option][Number] The number of milliseconds before the request times out. A value of 0 means there will be no timeout. Default `0`.
  * `timeoutCB`: [Option][Function] The time-out callback function. Default `null`.

#### `miniXhr.jsonp(url, [,settings])`
* `url`: [Require][String] The server URL that will be used for the request.
* The `settings` supports: [Option][Object]
  * `data`: [Option][Object] The key-value pair for the URL parameters to be sent with the request. Default `{}`.
  * `timeout`: [Option][Number] The number of milliseconds before the request times out. A value of 0 means there will be no timeout. Default `5000`.

#### Handling Errors
##### GET or POST
```javascript
miniXhr.get('/getData')
  .then((data) => {
    // data handle
  })
  .catch((err) => {
    console.log(err.statusText);  // the text of the response status
    console.log(err.status);      // the numerical HTTP status code
  });
```

##### JSONP
```javascript
miniXhr.jsonp('/getData')
  .then((data) => {
    // data handle
  })
  .catch((err) => {
    console.log(err);  // return 'error' or 'timeout'
  });
```

### Use in browser: E.g.
```html
<script src="mini-xhr.umd.min.js"></script>
<script>
  miniXhr.jsonp('/getData', {
    data: {
      key1: 'value1',
      key2: 'value2',
    }
  })
    .then(function(data) {
      // data handle
    });
</script>
```

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

To use via a CDN include this in your html:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/mini-xhr@6/dist/mini-xhr.umd.min.js"></script>
```

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/mini-xhr
[npm-url]: https://npmjs.org/package/@cycjimmy/mini-xhr
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/@cycjimmy/mini-xhr

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/mini-xhr
[download-url]: https://npmjs.org/package/@cycjimmy/mini-xhr

[jsdelivr-image]: https://img.shields.io/jsdelivr/npm/hy/@cycjimmy/mini-xhr
[jsdelivr-url]: https://www.jsdelivr.com/package/npm/@cycjimmy/mini-xhr

[workflows-badge-image]: https://github.com/cycjimmy/mini-xhr/workflows/Test%20CI/badge.svg

[libraries-status-image]: https://img.shields.io/librariesio/release/npm/@cycjimmy/mini-xhr
[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/mini-xhr
[libraries-status-url]: https://libraries.io/github/cycjimmy/mini-xhr
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fmini-xhr

[coverage-image]: https://img.shields.io/coveralls/github/cycjimmy/mini-xhr
[coverage-url]: https://coveralls.io/github/cycjimmy/mini-xhr

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/mini-xhr
[release-url]: https://github.com/cycjimmy/mini-xhr/releases

[rollup-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/mini-xhr/dev/rollup
[rollup-url]: https://github.com/rollup/rollup

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[jest-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg
[jest-url]: https://github.com/facebook/jest

[license-image]: https://img.shields.io/npm/l/@cycjimmy/mini-xhr

[Readme-url-En]: ./README.md
[Readme-url-ZhCN]: ./README_zhCN.md
