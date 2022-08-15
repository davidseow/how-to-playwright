import { chromium, FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${baseURL}/react-admin-demo/#/`, {
    waitUntil: "networkidle",
  });

  await page.fill('input[name="username"]', "demo");
  await page.fill('input[name="password"]', "demo");
  await page.click('text="Sign in"');

  await page.context().storageState({ path: "state.json" });
  await browser.close();
}

export default globalSetup;
