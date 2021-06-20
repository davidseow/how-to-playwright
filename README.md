# how-to-playwright

Example Playwright test setup for test runners listed below.

- jest-playwright
- @playwright/test

Checks are written against React Admin demo and will include the following

- [ ] screenshot on test failure
- [x] example tests
- [ ] example mobile layout tests
- [ ] example test against mock API
- [ ] login once by reusing context
- [ ] example command to run a single test

# Setup

Uses pnpm instead of npm. Please see [pnpm installation guide](https://pnpm.io/installation) to set this up.

Access test runner sub-folder (e.g. ./jest-playwright or ./playwright-test). And run `pnpm i` to install node dependencies.

To trigger checks, just run `pnpm t`.

If you would like to run checks in headed mode, `pnpm test:watch`
