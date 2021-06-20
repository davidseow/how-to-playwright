import { test, expect } from "@playwright/test";
const { beforeEach, describe } = test;

const { BASEURL } = process.env;

describe("Login", () => {
  beforeEach(async ({ page }) => {
    await page.goto(`${BASEURL}/react-admin-demo`, {
      waitUntil: "networkidle",
    });
  });

  test("should be able to login", async ({ page }) => {
    await page.fill('input[name="username"]', "demo");
    await page.fill('input[name="password"]', "demo");
    await page.click('text="Sign in"');

    const profileHeader = await page.$('[aria-label="Profile"]');
    expect(await profileHeader.textContent()).toContain("Jane Doe");
  });
});
