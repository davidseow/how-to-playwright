const PlaywrightEnvironment =
  require("jest-playwright-preset/lib/PlaywrightEnvironment").default;

class CustomEnvironment extends PlaywrightEnvironment {
  async setup() {
    await super.setup();
  }

  async teardown() {
    await super.teardown();
  }

  async handleTestEvent(event) {
    await super.handleTestEvent(event);

    if (event.name === "test_done" && event.test.errors.length > 0) {
      const parentName = event.test.parent.name.replace(/\W/g, "-");
      const specName = event.test.name.replace(/\W/g, "-");

      await this.global.page.screenshot({
        path: `screenshots/${parentName}_${specName}.png`,
      });
    }
  }
}

module.exports = CustomEnvironment;
