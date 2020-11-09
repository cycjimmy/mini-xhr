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
              timeout: 500,
            })(),
          },
          {
            route: '/postSuccess',
            handle: makeAjax({
              apiName: 'postSuccess',
              data: {
                'massage': 'success'
              },
              timeout: 500,
            })(),
          },
          {
            route: '/scriptSuccess',
            handle: makeAjax({
              apiName: 'scriptSuccess',
              data: JSON.stringify({
                'massage': 'success'
              }),
              timeout: 500,
            })(),
          },
          {
            route: '/jsonpSuccess',
            handle: makeAjax({
              apiName: 'jsonpSuccess',
              data: JSON.stringify({
                'massage': 'success'
              }),
              timeout: 500,
            })(),
          },
        ],
      })
    ]
  }
];
