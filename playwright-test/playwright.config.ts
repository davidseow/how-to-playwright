import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve("./global-setup"),
  use: {
    screenshot: "only-on-failure",
  },
};
export default config;
