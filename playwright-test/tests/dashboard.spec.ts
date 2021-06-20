import { test, expect, chromium } from "@playwright/test";
test.use({ storageState: "state.json" });

const { beforeEach, describe } = test;
const { BASEURL } = process.env;

describe("Dashboard", () => {
  beforeEach(async ({ page }) => {
    await page.goto(`${BASEURL}/react-admin-demo`, {
      waitUntil: "networkidle",
    });
  });

  test("should display dashboard", async ({ page }) => {
    const pageCard = await page.$("#main-content .MuiPaper-elevation1");
    expect(await pageCard.textContent()).toContain(
      "Welcome to the react-admin e-commerce demo"
    );
  });
});
