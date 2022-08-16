import { test as base } from "@playwright/test";

const test = base.extend<{
  captureFullScreenOnFail: void;
  saveLogOnFail: void;
}>({
  screenshot: "off",

  // capture fullscreen if test fails
  captureFullScreenOnFail: [
    async ({ page }, use, testInfo) => {
      await use(); // run test steps..

      if (testInfo.status !== testInfo.expectedStatus) {
        const screenshotFileName = `${testInfo.title.replace(/ /g, "_").toLowerCase()}.png`;
        await page.screenshot({
          path: `${testInfo.outputDir}/${screenshotFileName}`,
          fullPage: true,
        });
      }
    },
    { auto: true },
  ],

  // log out browser console if test fails
  saveLogOnFail: [
    async ({ page }, use, testInfo) => {
      let browserConsolelogs: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "log") {
          browserConsolelogs.push(`Browser Log: ${msg.text()}`);
        }
      });

      await use();

      if (testInfo.status !== testInfo.expectedStatus) {
        console.log(browserConsolelogs.join("\n"));
      }
    },
    { auto: true },
  ],
});

export default test;
