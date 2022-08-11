import test from "../fixtures/base-fixture";
test.use({ storageState: "state.json" });

const { beforeEach, describe, expect } = test;

describe("Reviews", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/react-admin-demo/#/reviews", {
      waitUntil: "networkidle",
    });
  });

  test("should display a list of reviews", async ({ page }) => {
    const reviewList = await page.$$("#main-content .list-page table tbody tr");
    expect(reviewList.length).toBe(25);
  });
});
