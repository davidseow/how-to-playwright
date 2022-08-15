import test from "../fixtures/base-fixture";

test.use({ storageState: "state.json" });

const { beforeEach, describe, expect } = test;

describe("Customers", () => {
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
      document.querySelectorAll("#main-content input").forEach((input, index) => {
        input.addEventListener("click", function (e) {
          throw new Error(`Error ${index}`);
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
          randomizer: new gremlins.Chance(1234), // repeatable
          species: [gremlins.species.formFiller(), customClicker, customToucher],
        })
        .unleash();
    });

    await page.waitForSelector("text=Identity");
    expect(errors.length).toBeGreaterThan(0); // inverting this so it passes in CI
  });
});
