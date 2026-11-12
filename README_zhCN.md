# Mini XHR
![Test CI status][workflows-badge-image]
[![libraries dependency status][libraries-status-image]][libraries-status-url]
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Release date][release-date-image]][release-url]
[![vite][vite-image]][vite-url]
[![semantic-release][semantic-image]][semantic-url]
[![jest][jest-image]][jest-url]
[![npm license][license-image]][download-url]

非常轻量级的HTTP请求库。

语言: [En][Readme-url-En] | [中文][Readme-url-ZhCN]
***

## 安装
[![NPM version][npm-image]][npm-url]
[![NPM bundle size][npm-bundle-size-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# 通过 npm 安装
$ npm install @cycjimmy/mini-xhr --save

# 或者通过 yarn 安装
$ yarn add @cycjimmy/mini-xhr
```

## 使用
```javascript
import miniXhr from '@cycjimmy/mini-xhr'

miniXhr.get('/getData')
  .then((data) => {
    // 数据处理
  })
  .catch((err) => {
    console.error(err) // 错误处理
  })
```

### 模块格式
自 v8 起本包为 **纯 ESM**：`main`、`module` 和 `exports`（`import` / `default`）全部指向 `dist/mini-xhr.esm.js`，同时仍发布 `dist/mini-xhr.umd.min.js` 供 `<script>` 标签和 CDN 使用（挂载 `miniXhr` 全局变量）。

CommonJS 产物（`dist/mini-xhr.cjs`）、`require` 导出条件以及 `package.cjs` 垫片均已移除，因此 `require('@cycjimmy/mini-xhr')` 不再可用。在 CommonJS 中请使用动态导入（该环境不支持顶层 `await`）；传统脚本请使用下方的 UMD 包：

```javascript
import('@cycjimmy/mini-xhr')
  .then(({ default: miniXhr }) => {
    // 在此使用 miniXhr
  })
  .catch(console.error)
```

构建目标为 ES2015，因此不再提供此前的 ES5/IE 转译保证。

### miniXhr支持以下几种请求方法：
#### `miniXhr.get(url, [,settings])`
* `url`: [必选][String] 用于请求的服务器URL.
* `settings`: [可选][Object] 支持以下设定.
  * `params`: [可选][Object] 与请求一起发送的URL参数(以键值对形式设定). 默认为 `{}`.
  * `responseType`: [可选][String] 服务器响应的数据类型. 可选以下值:
    * `'arraybuffer'`
    * `'document'`
    * `'json'`(默认)
    * `'text'`
    * `'stream'`
    * `'blob'`
  * `headers`: [可选][Object] 自定义要发送的请求头(以键值对形式设定). 默认为 `{}`.
  * `contentType`: [可选][String] 内容类型. 默认为 `'application/json; charset=UTF-8'`.
  * `timeout`: [可选][Number] 请求超时前的毫秒数. 设定值为0表示没有不进行超时设定. 默认为 `0`.
  * `ontimeoutCB`: [可选][Function] 自定义超时回调函数. 默认为 `null`.

#### `miniXhr.post(url, [,settings])`
* `url`: [必选][String] 用于请求的服务器URL.
* `settings`: [可选][Object] 支持以下设定.
  * `params`: [可选][Object] 与请求一起发送的URL参数(以键值对形式设定). 默认为 `{}`.
  * `data`: [可选][Object|FormData|String] 作为请求主体一起发送的数据. 默认为 `{}`.
  * `dataType`: [可选][String] 发送数据的类型. 可选以下值:
    * `'json'`(默认)
    * `'formData'`
    * `'text'`
  * `responseType`: [可选][String] 服务器响应的数据类型. 可选以下值:
    * `'arraybuffer'`
    * `'document'`
    * `'json'`(默认)
    * `'text'`
    * `'stream'`
    * `'blob'`
  * `headers`: [可选][Object] 自定义要发送的请求头(以键值对形式设定). 默认为 `{}`.
  * `contentType`: [可选][String] 内容类型. 默认为 `'application/json; charset=UTF-8'`.
  * `timeout`: [可选][Number] 请求超时前的毫秒数. 设定值为0表示没有不进行超时设定. 默认为 `0`.
  * `ontimeoutCB`: [可选][Function] 自定义超时回调函数. 默认为 `null`.

#### `miniXhr.jsonp(url, [,settings])`
* `url`: [必选][String] 用于请求的服务器URL.
* `settings`: [可选][Object] 支持以下设定.
  * `params`: [可选][Object] 与请求一起发送的URL参数(以键值对形式设定). 默认为 `{}`.
  * `timeout`: [可选][Number] 请求超时前的毫秒数. 设定值为0表示没有不进行超时设定. 默认为 `5000`.

#### 错误处理
##### GET 或者 POST
```javascript
miniXhr.get('/getData')
  .then((data) => {
    // 数据处理
  })
  .catch((err) => {
    console.log(err.statusText) // 响应状态文本
    console.log(err.status) // HTTP状态码
  })
```

##### JSONP
```javascript
miniXhr.jsonp('/getData')
  .then((data) => {
    // 数据处理
  })
  .catch((err) => {
    console.log(err) // 返回 'error' 或者 'timeout' (字符串)
  })
```

### 在浏览器中使用
```html
<script src="mini-xhr.umd.min.js"></script>
<script>
  miniXhr.jsonp('/getData', {
    params: {
      key1: 'value1',
      key2: 'value2',
    }
  })
    .then(function(data) {
      // 数据处理
    });
</script>
```

## CDN
[![jsdelivr][jsdelivr-image]][jsdelivr-url]

使用CDN，请在HTML中添加:
```text
<script src="https://cdn.jsdelivr.net/npm/@cycjimmy/mini-xhr@8/dist/mini-xhr.umd.min.js"></script>
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

[vite-image]: https://img.shields.io/github/package-json/dependency-version/cycjimmy/mini-xhr/dev/vite
[vite-url]: https://github.com/vitejs/vite

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[jest-image]: https://img.shields.io/badge/tested_with-jest-99424f.svg
[jest-url]: https://github.com/facebook/jest

[license-image]: https://img.shields.io/npm/l/@cycjimmy/mini-xhr

[Readme-url-En]: ./README.md
[Readme-url-ZhCN]: ./README_zhCN.md
