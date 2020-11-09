# Mini XHR
![][workflows-badge-image]
[![build status][travis-image]][travis-url]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![rollup][rollup-image]][rollup-url]
[![semantic-release][semantic-image]][semantic-url]
[![jest][jest-image]][jest-url]
[![npm license][license-image]][download-url]


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
  });
```

### miniXhr supports the following methods:
#### `miniXhr.get(url, [, settings])`
* `url`: [String] A string containing the URL to which the request is sent.
* settings:
  * `data`: [Object] The key-value pair that needs to be transmitted. Default `{}`.
  * `dataType`: [String] Request data type. Default `'json'`.
  * `contentType`: [String] Setting content type. Default `'application/x-www-form-urlencoded; charset=UTF-8'`.
  * `timeout`: [Number] Set a timeout for the request. A value of 0 means there will be no timeout. Default `0`.
  * `timeoutCB`: [Function] Set the time-out callback function. Default `null`.
  
#### `miniXhr.post(url, [, settings])`
* `url`: [String] A string containing the URL to which the request is sent.
* settings:
  * `data`: [Object] The key-value pair that needs to be transmitted. Default `{}`.
  * `dataType`: [String] Request data type. Default `'json'`.
  * `contentType`: [String] Setting content type. Default `'application/x-www-form-urlencoded; charset=UTF-8'`.
  * `timeout`: [Number] Set a timeout for the request. A value of 0 means there will be no timeout. Default `0`.
  * `timeoutCB`: [Function] Set the time-out callback function. Default `null`.

#### `miniXhr.jsonp(url, [, settings])`
* `url`: [String] A string containing the URL to which the request is sent.
* settings:
  * `data`: [Object] The key-value pair that needs to be transmitted. Default `{}`.
  * `timeout`: [Number] Set a timeout for the request. A value of 0 means there will be no timeout. Default `0`.

### Use in browser: E.g.
```html
<script src="mini-xhr.umd.min.js"></script>
<script>
  miniXhr.jsonp('/getData' , {
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
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/mini-xhr@3/dist/mini-xhr.umd.min.js"></script>
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
[travis-image]: https://img.shields.io/travis/cycjimmy/mini-xhr
[travis-url]: https://travis-ci.org/cycjimmy/mini-xhr

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

