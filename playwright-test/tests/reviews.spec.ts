import test from "../fixtures/base-fixture";
test.use({ storageState: "state.json" });

const { beforeEach, describe, expect } = test;
const { BASEURL } = process.env;

describe("Reviews", () => {
  beforeEach(async ({ page }) => {
    await page.goto(`${BASEURL}/react-admin-demo/#/reviews`, {
      waitUntil: "networkidle",
    });
  });

  test("should display a list of reviews", async ({ page }) => {
    // const pageTitle = await page.title();
    // expect(pageTitle).toBe("Reviews");

    const reviewList = await page.$$("#main-content .list-page table tbody tr");
    expect(reviewList.length).toBe(25);
  });
});
