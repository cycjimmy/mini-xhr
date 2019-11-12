import {input, name, plugins, exports} from './rollup.common';

import pkg from '../package.json';

export default [
  {
    input,
    output: {
      name,
      file: pkg.browser.replace('.min.js', '.js'),
      format: 'umd',
      exports,
    },
    plugins: [
      ...plugins,
    ],
  },
];
