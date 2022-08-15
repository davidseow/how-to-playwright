import test from "../fixtures/base-fixture";
test.use({ storageState: "state.json" });

const { beforeEach, describe, expect } = test;

describe("Customers", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/react-admin-demo/#/customers", {
      waitUntil: "networkidle",
    });
  });

  test("should display a list of customers", async ({ page }) => {
    const customerRow = await page.locator(
      "#main-content .list-page table tbody .MuiTableRow-root"
    );
    expect(await customerRow.count()).toBe(25);
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
