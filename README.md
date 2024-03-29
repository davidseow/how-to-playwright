# how-to-playwright

Example Playwright test setup for test runners listed below.

- jest-playwright
- @playwright/test

Checks are written against React Admin demo and will include the following

- [x] screenshot on test failure
- [x] example tests
- [x] example mobile layout tests (added for @playwright/test)
- [x] example test that manipulates network requests
- [x] login once by reusing context (added for @playwright/test)
- [x] example command to run a single test
- [x] [Monkey testing with Gremlin.js](playwright-test/tests/monkey-testing.spec.ts)
- [x] Fullscreen capture on test failure
- [x] Override/extend test fixtures
- [x] Page Object with custom type
- [x] Enable trace recording for a test block

# Setup

Uses pnpm instead of npm. Please see [pnpm installation guide](https://pnpm.io/installation) to set this up.

Access test runner sub-folder (e.g. ./jest-playwright or ./playwright-test). And run `pnpm i` to install node dependencies.

To trigger checks, just run `pnpm t`.

If you would like to run checks in headed mode, `pnpm test:watch` (only in jest-playwright)

To run against a single check/checks grouped within a describe block, `pnpm t -- --grep '<describe label|test label>'`. E.g.: `pnpm t -- --grep 'Customers'`

# Troubleshooting

## macOS firewall popup on every debug run

With every debug run (in headed mode), you get prompted the following question - "Do you want to the application Chromium.app to accept incoming network connections?". Explanation is documented in [link](https://github.com/puppeteer/puppeteer/issues/4752)

tldr; you can resolve this by running the following command

```
sudo codesign --force --deep --sign -  ~/Library/Caches/ms-playwright/chromium-*/chrome-mac/Chromium.app
```
