import test from "../fixtures/base-fixture";

test.use({ storageState: "state.json" });

const { expect } = test;
const { BASEURL } = process.env;

test("should display fallback svg when avatar thumbnail fails to load", async ({
  page,
}) => {
  // drop all image requests
  await page.route("**/*.{png,jpg,jpeg}*", (route) => route.abort());

  await page.goto(`${BASEURL}/react-admin-demo`, {
    waitUntil: "networkidle",
  });

  await page.waitForTimeout(1000);

  const fallbackAvatarImage = await page.$$(
    ".MuiList-root .MuiAvatar-root.MuiAvatar-circle svg"
  );

  expect(fallbackAvatarImage.length).toBeGreaterThan(1);
});
