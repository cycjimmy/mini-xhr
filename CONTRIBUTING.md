# Contributing

Thanks for taking the time to contribute. The repository is released under the MIT license, follows a standard GitHub development process, tracks bugs and ideas in the issue tracker and merges pull requests into `main`.

## Requirements

- Node.js `^22.22.2 || >=24` (Vite 8, ESLint 10 and Stylelint 17 all require a modern runtime).
- npm 11 or newer, so `npm ci` reproduces the lockfile exactly.

## Getting started

```shell
$ npm ci
$ npm run dev
```

The dev server opens `/static/index.html`, a demo page that exercises every public API (`get`, `post`, `jsonp`, including the failing and timing-out code paths). The demo talks to a tiny mock API registered by the Vite dev middleware, so no backend is needed, and the dev server rewrites the `<script src="./mini-xhr.umd.js">` tag into a module shim that imports `src/` directly, so no build is required while developing.

To exercise a built UMD bundle instead, copy it next to the demo page and serve the demo against it. `umd-demo` keeps the mock API but skips the `src/` shim, so the page loads the bundle exactly as a consumer would:

```shell
$ npm run build
$ cp dist/mini-xhr.umd.js static/
$ npm run dev:umd
```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server and open the demo page. |
| `npm run dev:umd` | Same, but load a UMD bundle copied into `static/` instead of `src/`. |
| `npm test` | Run the Jest suite through the native ESM pipeline. |
| `npm run test:coverage` | Same as `npm test` with coverage, uploaded by the Coveralls workflow. |
| `npm run lint` | Lint JavaScript with ESLint 10 (flat config, `@antfu/eslint-config`). |
| `npm run lint:fix` | Lint JavaScript and apply the automatic fixes. |
| `npm run lint:style` | Lint the CSS files under `static/` with Stylelint. |
| `npm run lint:style:fix` | Lint the CSS files and apply the automatic fixes. |
| `npm run build` | Build the ESM, UMD and minified UMD bundles into `dist/`. |
| `npm run package` | Build and assemble the publishable `.release/` directory. |

## Repository layout

| Path | Responsibility |
| --- | --- |
| `src/` | Library sources. `index.js` exposes `get`/`post`/`jsonp`, `_XMLHttpRequest.js` wraps `XMLHttpRequest`, `tools.js` holds the helpers. |
| `__test__/` | Jest specs, executed with `jest-environment-jsdom`. |
| `__mocks__/` | Shared fixtures for the specs. |
| `static/` | Demo page (`index.html`, `index.css`, `demo.js`) plus the UMD bundles copied in by the build. It is not part of the published package. |
| `tasks/` | Post-build scripts that assemble `.release/`. |
| `dist/` | Generated bundles, never committed. |
| `vite.config.mjs` | Build modes (`esm`, `umd`, `umd-min`), the demo mock API and the dev UMD shim. |
| `release.config.js` | semantic-release configuration. |

The library is ESM only: `main`, `module` and `exports` point to `dist/mini-xhr.esm.js`, and `dist/mini-xhr.umd.min.js` exists only for `<script>` tags and CDNs. Relative imports must keep their explicit `.js` extension because Jest runs the sources through the native ESM loader without any transformation step.

## Commits and pull requests

- Write every commit message, pull request title, pull request body and issue reply in English.
- Follow [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `ci:`, `chore:`, `test:`, `refactor:`. Releases are derived from these messages by semantic-release, so a fix that ships must be a `fix:` and a new API must be a `feat:`.
- Signal a breaking change with `!` after the type (for example `feat!: ...`) and explain the migration in a `BREAKING CHANGE:` footer.
- Run `npm run lint`, `npm run lint:style`, `npm test` and `npm run package` before opening a pull request; the `Test CI` workflow runs the same commands on Node 22 and 24 across Linux, Windows and macOS.
- Fill in `.github/PULL_REQUEST_TEMPLATE.md` and link the issue it resolves.

## Repository settings required by the bots

The automation in `.github/workflows/` expects the following repository configuration. Missing pieces show up as skipped jobs or `422` errors from the GitHub API.

1. **Labels** — issue forms, the triage bot and the stale bot all reference them by name:

   | Label | Purpose |
   | --- | --- |
   | `bug` | Something is not working. |
   | `enhancement` | New feature or request. |
   | `needs-info` | Waiting for more information from the reporter. |
   | `usage` | Question about how to use mini-xhr. |
   | `triaged` | Reviewed by a maintainer, exempt from staleness. |
   | `stale` | No recent activity, pending automatic close. |
   | `ci` | GitHub Actions updates. |
   | `dependencies` | Dependency updates. |

   ```shell
   $ while read -r name color desc; do
       gh label create "$name" --repo cycjimmy/mini-xhr --color "$color" --description "$desc" --force
     done <<'LABELS'
   bug d73a4a Something is not working
   enhancement a2eeef New feature or request
   needs-info d876e3 Waiting for more information from the reporter
   usage 0075ca Question about how to use mini-xhr
   triaged 0e8a16 Reviewed by a maintainer, exempt from staleness
   stale fef2c0 No recent activity, pending automatic close
   ci 1d76db GitHub Actions updates
   dependencies 0366d6 Dependency updates
   LABELS
   ```

2. **Auto-merge** — enabled so `dependabotAutoMerge.yml` can queue non-major Dependabot pull requests:

   ```shell
   $ gh repo edit cycjimmy/mini-xhr --enable-auto-merge
   ```

3. **Workflow permissions** — the default must be `write` so the Dependabot workflow can approve and merge:

   ```shell
   $ gh api --method PUT repos/cycjimmy/mini-xhr/actions/permissions/workflow \
       -f default_workflow_permissions=write
   ```

4. **Branch protection on `main`** — do not require status checks: semantic-release pushes its `chore(release): ... [skip ci]` commit directly to `main`, and a personal account cannot add the Action to the bypass list.

5. **npm Trusted Publisher** — the release workflow publishes through OIDC and carries no `NPM_TOKEN`. Register it once at <https://www.npmjs.com/package/@cycjimmy/mini-xhr/access> with organization `cycjimmy`, repository `mini-xhr` and workflow filename `release.yml`. The GitHub Package Registry keeps using the built-in `GITHUB_TOKEN`.

## Questions

Open an issue with the `usage` label, or read the [README](./README.md) first: most questions are about import style, CORS and the request settings.
