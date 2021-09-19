import { PlaywrightTestConfig } from "@playwright/test";

const { CI = "false" } = process.env;

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./global-setup"),
  forbidOnly: CI === "true" ? true : false,
  use: {
    screenshot: "only-on-failure",
  },
};
export default config;
