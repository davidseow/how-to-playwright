import test from "../fixtures/base-fixture";

test.use({ storageState: "state.json" });

const { expect } = test;

test("should display fallback svg when avatar thumbnail fails to load", async ({ page }) => {
  // drop all image requests
  await page.route("**/*.{png,jpg,jpeg}*", (route) => route.abort());

  await page.goto("/react-admin-demo", {
    waitUntil: "networkidle",
  });

  await page.waitForTimeout(1000);

  const fallbackAvatarImage = await page.$$(
    ".MuiCard-root .MuiList-root .MuiListItem-root .MuiAvatar-circular svg"
  );

  expect(fallbackAvatarImage.length).toBeGreaterThan(1);
});
