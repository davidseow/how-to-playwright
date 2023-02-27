import test from "../fixtures/base-fixture";

test.use({ storageState: "state.json" });

const { beforeEach, describe, expect } = test;

describe("Monkey testing", () => {
  let errors = [];

  beforeEach(async ({ page }) => {
    // log out everything from console
    page.on("pageerror", (err) => {
      console.log(`🐟`, err.message);
      errors.push(err.message);
    });

    // credit to https://github.com/marmelab/gremlins.js/issues/175#issuecomment-1000283640
    await page.addInitScript({
      path: "./node_modules/gremlins.js/dist/gremlins.min.js",
    });

    await page.goto("/react-admin-demo/#/customers/878", {
      waitUntil: "networkidle",
    });
  });

  test("should catch JavaScript error", async ({ page }) => {
    const pageTitle = await page.title();
    expect(pageTitle).toBe("Posters Galore Administration");

    await page.evaluate(() => {
      // simulate error
      const testElemsToError = ["#main-content .ra-input", "#main-content input"];

      // console.log("🚩 Test log from browser..");

      // for (let count = 0; count < 11; count++) {
      //   Promise.reject(new Error("sad :("));
      // }

      testElemsToError.forEach((elem) => {
        document.querySelectorAll(elem).forEach((elem, index) => {
          elem.addEventListener("click", function (e) {
            throw new Error(`Click - error on elem ${index}`);
          });

          elem.addEventListener("touchstart", function (e) {
            throw new Error(`Touch error on elem ${index}`);
          });
        });
      });

      // customise gremlin.js
      const customClicker = gremlins.species.clicker({
        clickTypes: ["click"],
        canClick: (element) => element.closest("#main-content .MuiCardContent-root"),
      });

      const customToucher = gremlins.species.toucher({
        touchTypes: ["tap", "gesture"],
        canTouch: (element) => element.closest("#main-content .MuiCardContent-root"),
      });

      return gremlins
        .createHorde({
          strategies: [gremlins.strategies.allTogether({ nb: 10000 })],
          randomizer: new gremlins.Chance(4321), // repeatable
          species: [gremlins.species.formFiller(), customClicker, customToucher],
        })
        .unleash();
    });

    await page.locator("text=Identity").waitFor();
    expect(errors.length).toBeGreaterThan(10); // inverting this so it passes in CI
  });
});
