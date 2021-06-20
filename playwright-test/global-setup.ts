import { chromium } from "@playwright/test";

const { BASEURL } = process.env;

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${BASEURL}/react-admin-demo/#/`, {
    waitUntil: "networkidle",
  });

  await page.fill('input[name="username"]', "demo");
  await page.fill('input[name="password"]', "demo");
  await page.click('text="Sign in"');

  await page.context().storageState({ path: "state.json" });
  await browser.close();
}

export default globalSetup;
