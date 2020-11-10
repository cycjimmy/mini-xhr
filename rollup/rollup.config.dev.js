import browsersync from 'rollup-plugin-browsersync';
import makeAjax from '@cycjimmy/config-lib/browsersync/2.x/middleware/makeAjax';

import pkg from '../package.json';

import {input, IS_DEVELOPMENT, name, plugins} from './rollup.common';

export default [
  {
    input,
    output: {
      name,
      file: pkg.browser.replace('.min.js', '.js'),
      format: 'umd'
    },
    plugins: [
      ...plugins,

      IS_DEVELOPMENT &&
      browsersync({
        server: ['static', 'dist'],
        watch: true,
        middleware: [
          {
            route: '/getSuccess',
            handle: makeAjax({
              apiName: 'getSuccess',
              data: {
                'massage': 'success'
              },
              timeout: 1e3,
            })(),
          },
          {
            route: '/postSuccess',
            handle: makeAjax({
              apiName: 'postSuccess',
              data: {
                'massage': 'success'
              },
              timeout: 1e3,
            })(),
          },
          {
            route: '/jsonpSuccess',
            handle: (req, res, next) => {
              const apiName = 'jsonpSuccess';
              const timeout = 1e3;
              const remoteAddress = req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress
              ;

              const callBackName = req.originalUrl.replace(/.+callback=/, '');

              // Set Header
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Content-Type', 'application/json;charset=UTF-8');

              console.log(
                apiName + ' Receive a require' + '\n' +
                apiName + ' -----------------' + '\n' +
                apiName + ' Method: ' + req.method + '\n' +
                apiName + ' RemoteAddress: ' + remoteAddress + '\n' +
                apiName + ' callBackName: ' + callBackName + '\n'
              );

              setTimeout(() => {
                res.end(`typeof ${callBackName} === 'function' && ${callBackName}(${JSON.stringify({'massage': 'success'})})`);
                next();
              }, timeout);

              req.on('err', err => {
                console.log(
                  apiName + ' Error: ' + err + '\n'
                );

                res.end('Error:' + err);
                next();
              });
            },
          },
        ],
      })
    ]
  }
];
