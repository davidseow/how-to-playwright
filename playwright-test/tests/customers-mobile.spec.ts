import test from "../fixtures/mobile-fixture";

test.use({ storageState: "state.json" });

const { beforeEach, describe, expect } = test;
const { BASEURL } = process.env;

describe("Customers", () => {
  beforeEach(async ({ page }) => {
    await page.goto(`${BASEURL}/react-admin-demo/#/customers`, {
      waitUntil: "networkidle",
    });
  });

  test("should display a list of customers", async ({ page }) => {
    const pageTitle = await page.title();
    expect(pageTitle).toBe("Posters Galore Administration");

    const reviewList = await page.$$(
      "#main-content .list-page .MuiCardHeader-root"
    );
    expect(reviewList.length).toBe(25);
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
