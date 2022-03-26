/* eslint import/extensions: ["error", "ignorePackages", {"mjs": off}] */
import pkg from '../package.cjs';

import {
  banner, input, name, exports, plugins, terserPlugins,
} from './rollup.common.mjs';

export default [
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs', exports },
      { file: pkg.module, format: 'es', exports },
    ],
    plugins,
  },
  {
    input,
    output: {
      name,
      file: pkg.browser,
      format: 'umd',
      banner,
      exports,
    },
    plugins: [
      ...plugins,
      terserPlugins,
    ],
  },
];
