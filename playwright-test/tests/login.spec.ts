import test from "../fixtures/base-fixture";
const { beforeEach, describe, expect } = test;

describe("Login", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/react-admin-demo", {
      waitUntil: "networkidle",
    });
  });

  test("should be able to login", async ({ page }) => {
    await page.fill('input[name="username"]', "demo");
    await page.fill('input[name="password"]', "demo");
    await page.click('text="Sign in"');

    const profileHeader = await page.$('[aria-label="Profile"]');
    expect(await profileHeader?.textContent()).toContain("Jane Doe");
  });
});
