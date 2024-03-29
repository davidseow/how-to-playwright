import test from "../fixtures/base-fixture";
test.use({ storageState: "state.json" });

const { beforeEach, describe, expect } = test;

describe("Dashboard", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/react-admin-demo", {
      waitUntil: "networkidle",
    });
  });

  test("should display dashboard", async ({ page }) => {
    const pageCard = await page.$("#main-content .MuiPaper-elevation1");
    expect(await pageCard?.textContent()).toContain("Welcome to the react-admin e-commerce demo");
  });

  test("can navigate to main section using left panel menu", async ({ page }) => {
    const leftPanel = await page.$(".MuiDrawer-paperAnchorLeft");
    const menuItem = await leftPanel?.$('a[role="menuitem"]:has-text("Orders")');
    await menuItem?.click();

    const pageTitle = await page.title();
    const pageUrl = await page.url();

    // expect(pageTitle).toBe("Orders");
    expect(pageUrl).toContain("/#/commands");
  });
});
