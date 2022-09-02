import { devices } from "@playwright/test";
import test from "../fixtures/base-fixture";

test.use({ storageState: "state.json", trace: "on" });

const { describe, expect } = test;

describe("Run test with trace enabled", () => {
  test("desktop - should display", async ({ page }) => {
    await page.goto("/");
    expect(await page.viewportSize()).toEqual({ width: 1280, height: 720 });
  });
});
