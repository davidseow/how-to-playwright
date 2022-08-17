import { Locator, Page } from "@playwright/test";

export enum SortType {
  "id" = "id",
  "customer" = "customer_id",
  "address" = "customer_id",
  "total ex taxes" = "total_ex_taxes",
  "delivery fees" = "delivery_fees",
}

export class InvoicesPage {
  readonly page: Page;
  readonly invoiceTableHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.invoiceTableHeader = page.locator("#main-content .MuiTable-root .MuiTableHead-root");
  }

  async goto() {
    await this.page.goto("/react-admin-demo/#/invoices");
  }

  async sortBy(label: keyof typeof SortType) {
    const header = await this.invoiceTableHeader.locator(`tr >> text=/${label}/i`);
    await header.click();
  }
}
