import { createRequire } from 'node:module'

import myBanner from '@cycjimmy/config-lib/esm/chore/myBanner.js'
import terserOption from '@cycjimmy/config-lib/esm/terser/4.x/production.js'
import { defineConfig } from 'vite'

const pkg = createRequire(import.meta.url)('./package.json')

// config-lib's shared option follows terser 4's legacy `output` key. Vite always
// injects `format` and terser rejects having both, so convert `output` → `format`.
const { output, ...restTerserOption } = terserOption
const terserOptions = { ...restTerserOption, format: output }

// Output file names follow the pkg field conventions of the old rollup configs.
const esmFileName = pkg.module.replace('dist/', '') // mini-xhr.esm.js
const umdFileName = pkg.browser.replace('dist/', '').replace('.min.js', '.js') // mini-xhr.umd.js
const umdMinFileName = pkg.browser.replace('dist/', '') // mini-xhr.umd.min.js

const MOCK_API_DELAY = 1e3
// Keep the historical typo: the demo and the tests assert this payload as-is.
const MOCK_API_BODY = { massage: 'success' }

/**
 * Replaces the browsersync mock endpoints of the old rollup dev setup.
 *
 * The handlers are registered before Vite's internal middlewares: the SPA
 * fallback would otherwise answer the failure routes with `index.html` and a
 * 200 status, turning every "fail" button of the demo into a success.
 */
function mockApi() {
  const sendJson = (res) => {
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json;charset=UTF-8')
    res.end(JSON.stringify(MOCK_API_BODY))
  }

  const sendJsonp = (res, callbackName) => {
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/javascript;charset=UTF-8')
    res.end(
      `typeof ${callbackName} === 'function' && ${callbackName}(${JSON.stringify(MOCK_API_BODY)})`,
    )
  }

  return {
    name: 'mini-xhr-mock-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const { pathname, searchParams } = new URL(req.url, 'http://localhost')

        // Drain the body so keep-alive connections stay usable.
        req.resume()

        if (pathname === '/getSuccess' || pathname === '/postSuccess') {
          setTimeout(sendJson, MOCK_API_DELAY, res)
          return
        }

        if (pathname === '/jsonpSuccess') {
          const callbackName = searchParams.get('callback') ?? ''

          // The library builds the callback name itself (`jsonp_<random>`).
          if (!/^[a-z_$][\w$]*$/i.test(callbackName)) {
            res.statusCode = 400
            res.end('Invalid callback name')
            return
          }

          setTimeout(sendJsonp, MOCK_API_DELAY, res, callbackName)
          return
        }

        if (/^\/(?:get|post|jsonp)/.test(pathname)) {
          res.statusCode = 404
          res.end()
          return
        }

        next()
      })
    },
  }
}

/**
 * Lets `static/index.html` run against `src/` on the dev server instead of a
 * pre-built UMD bundle, so the deployed demo page and the dev page stay one
 * single file.
 */
function devUmdShim() {
  return {
    name: 'mini-xhr-dev-umd-shim',
    apply: 'serve',
    transformIndexHtml(html) {
      return html.replace(
        /<script src="\.\/mini-xhr\.umd\.js"><\/script>/,
        `<script type="module">
    import miniXhr from '/src/index.js'

    window.miniXhr = miniXhr
  </script>`,
      )
    },
  }
}

function libBuild({
  formats,
  fileName,
  minify = false,
  banner = null,
}) {
  return {
    target: 'es2015',
    outDir: 'dist',
    // Keep artifacts of previous incremental builds (`npm run build` cleans dist first).
    emptyOutDir: false,
    minify,
    ...(minify === 'terser' && { terserOptions }),
    lib: {
      entry: 'src/index.js',
      name: 'miniXhr',
      formats,
      fileName: () => fileName,
    },
    rollupOptions: {
      output: {
        // The package keeps its named exports: `miniXhr.get/post/jsonp` plus the
        // default export. Do not switch this to 'default'.
        exports: 'named',
        ...(banner && { banner }),
      },
    },
  }
}

const builds = {
  'esm': libBuild({
    formats: ['es'],
    fileName: esmFileName,
  }),
  'umd': libBuild({
    formats: ['umd'],
    fileName: umdFileName,
  }),
  'umd-min': libBuild({
    formats: ['umd'],
    fileName: umdMinFileName,
    minify: 'terser',
    banner: myBanner(pkg),
  }),
}

export default defineConfig(({ mode }) => {
  const build = builds[mode]
  // `umd-demo` serves the demo page against an UMD bundle copied into `static/`
  // (instead of the `src/` shim) while keeping the mock API endpoints.
  const useUmdBundle = mode === 'umd-demo'
  const plugins = [
    mockApi(),
  ]

  if (!useUmdBundle) {
    plugins.push(devUmdShim())
  }

  return {
    // Keep static/ out of dist: it would end up in the published .release.
    publicDir: false,
    plugins,
    server: {
      open: '/static/index.html',
    },
    ...(build && { build }),
  }
})
