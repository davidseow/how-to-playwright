import base from "./base-fixture";
import { devices } from "@playwright/test";

const test = base.extend<{}>({
  contextOptions: { ...devices["iPhone 11"], isMobile: true },
});

export default test;
