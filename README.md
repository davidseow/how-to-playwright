# playwright-how-to

Checks are written against React Admin demo

Examples test runner setup included:

- jest-playwright
- @playwright/test

# Setup

Uses pnpm instead of npm. Please see [pnpm installation guide](https://pnpm.io/installation) to set this up.

Access test runner sub-folder (e.g. ./jest-playwright). And run `pnpm i` to install node dependencies.

To trigger checks, just run `pnpm t`.

If you would like to run checks in headed mode, `pnpm test:watch`
