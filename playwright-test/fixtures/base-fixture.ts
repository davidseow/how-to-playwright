import { test } from "@playwright/test";

test.use({
  screenshot: "only-on-failure",
});

export default test;
