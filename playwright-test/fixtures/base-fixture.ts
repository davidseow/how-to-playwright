import { test as base } from "@playwright/test";

const test = base.extend<{
  captureFullScreenOnFail: void;
}>({
  screenshot: "off",
  captureFullScreenOnFail: [
    async ({ page }, use, testInfo) => {
      await use(); // run test steps..

      // capture fullscreen if test fails
      if (testInfo.status === "failed") {
        const screenshotFileName = `${testInfo.title.replace(/ /g, "_").toLowerCase()}.png`;
        await page.screenshot({
          path: `${testInfo.outputDir}/${screenshotFileName}`,
          fullPage: true,
        });
      }
    },
    { auto: true },
  ],
});

export default test;
