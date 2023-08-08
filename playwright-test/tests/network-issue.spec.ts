import test from "../fixtures/base-fixture";

test.use({ storageState: "state.json" });

const { expect } = test;

test("should display CSS thumbnail when avatar thumbnail fails to load", async ({ page }) => {
  // drop all image requests
  await page.route("**/*.{png,jpg,jpeg}*", (route) => route.abort());

  await page.goto("/react-admin-demo", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1000);

  const newCustomersCard = await page.locator(".MuiCard-root", { hasText: /new customers/i });

  // chaining, locator find again instead of <>.filter to return multiple elements
  const fallbackAvatarCSSThumbnail = await newCustomersCard.locator(
    ".MuiList-root .MuiListItem-root .MuiAvatar-circular"
  );

  // nb: locator.isVisible() does not wait for element to be visible, see: https://github.com/microsoft/playwright/pull/9200
  await fallbackAvatarCSSThumbnail.first().waitFor();
  expect(await fallbackAvatarCSSThumbnail.count()).toBeGreaterThan(1);
});
