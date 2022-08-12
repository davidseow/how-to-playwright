import test from "../fixtures/mobile-fixture";

test.use({ storageState: "state.json" });

const { beforeEach, describe, expect } = test;

describe("Customers", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/react-admin-demo/#/customers", {
      waitUntil: "networkidle",
    });

    const drawer = await page.locator('.MuiBackdrop-root[aria-hidden="true"]');
    // close drawer if visible
    if (await drawer.isVisible()) {
      await drawer.click();
    }
  });

  test("should display a list of customers", async ({ page }) => {
    const pageTitle = await page.title();
    expect(pageTitle).toBe("Posters Galore Administration");

    const reviewTableRow = "#main-content .list-page .MuiCard-root";
    await page.waitForSelector(reviewTableRow);

    const reviewList = await page.$$(reviewTableRow);
    expect(reviewList.length).toBe(27);
  });

  test("should be able to add new customer", async ({ page }) => {
    const customer = {
      first_name: "TestFirstName",
      last_name: "TestLastName",
      email: "test@email.com",
    };

    await page.click('a[aria-label="Create"]');
    for (const property in customer) {
      await page.fill(`#${property}`, customer[property]);
    }
    await page.click('button[aria-label="Save"]');

    await page.waitForURL("**/#/customers/9*");
  });
});
