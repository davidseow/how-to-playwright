import test from "../fixtures/base-fixture";
import { InvoicesPage, SortType } from "../pageObjects/invoices.page";

test.use({ storageState: "state.json" });

const { describe, expect } = test;

describe("Invoices and Page Object", () => {
  test("should be able to update table sorting", async ({ page }) => {
    const invoicesPage = new InvoicesPage(page);
    await invoicesPage.goto();
    await invoicesPage.sortBy("total ex taxes");
    expect(await page.url()).toContain(SortType["total ex taxes"]);
  });
});
