import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    type: 'lib',
    ignores: [
      'dist/**',
      'coverage/**',
      '.release/**',
      'docs/**',
    ],
  },
  {
    files: ['__test__/**/*.js', '__mocks__/**/*.js'],
    languageOptions: {
      globals: {
        // The suite runs in the jsdom environment.
        ...globals.browser,
        ...globals.jest,
      },
    },
  },
  {
    // The demo runs as a classic script against the `miniXhr` UMD global, both
    // on the dev server and on the built bundle.
    files: ['static/**/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        ...globals.browser,
        miniXhr: 'readonly',
      },
    },
    // Printing the request results is the whole point of the demo page.
    rules: {
      'no-console': 'off',
    },
  },
  {
    // The packaging scripts report their progress on stdout.
    files: ['tasks/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  },
)
