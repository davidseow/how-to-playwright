import { test as base } from "@playwright/test";

const test = base.extend<{}>({
  screenshot: "only-on-failure",
});

export default test;
