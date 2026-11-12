export default {
  // The sources are plain ESM with explicit `.js` extensions and run through the
  // native ESM pipeline (`NODE_OPTIONS=--experimental-vm-modules`), so no
  // transformation step is involved.
  transform: {},
  testEnvironment: 'jsdom',
  // `npm run package` writes a copy of this package into `.release`. Without
  // these ignores Jest reports a haste module naming collision for the
  // duplicated package.json and walks generated files it should not touch.
  modulePathIgnorePatterns: [
    '<rootDir>/.release/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
}
