import { devices } from "@playwright/test";

import test from "./base-fixture";

test.use({
  contextOptions: { ...devices["iPhone 11"] },
});

export default test;
