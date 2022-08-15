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
    // checkboxes specifically because table row is rendered before row text 🤷‍♂️
    const reviewRows = await page.locator(
      "#main-content .list-page table tbody .MuiTableRow-root [aria-label='Select this row']"
    );

    // nb: locator.isVisible() does not wait for element to be visible, see: https://github.com/microsoft/playwright/pull/9200
    await reviewRows.first().waitFor();
    expect(await reviewRows.count()).toBe(25);
  });
});
