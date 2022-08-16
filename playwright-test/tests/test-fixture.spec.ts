import { devices } from "@playwright/test";
import test from "../fixtures/base-fixture";

export const tabletTest = test.extend<{}>({
  contextOptions: { ...devices["iPad (gen 7) landscape"], isMobile: true },
});

test.use({ storageState: "state.json" });

const { describe, expect } = test;

describe("Extend fixture", () => {
  // use "default" base fixture
  test("desktop - should display", async ({ page }, testInfo) => {
    await page.goto("/");
    expect(await page.viewportSize()).toEqual({ width: 1280, height: 720 });
  });

  // extend fixture
  tabletTest("(extend) tablet - should display correctly", async ({ page }, testInfo) => {
    await page.goto("/");
    expect(await page.viewportSize()).toEqual({ width: 1080, height: 810 });
  });
});

describe("Override fixture in test group", () => {
  test.use({ contextOptions: { ...devices["Kindle Fire HDX"], isMobile: true } });

  test("(test.use) tablet - should display correctly", async ({ page }, testInfo) => {
    await page.goto("/");
    expect(await page.viewportSize()).toEqual({ width: 800, height: 1280 });
  });
});
