const { BASEURL } = process.env;

describe("Login", () => {
  beforeAll(async () => {
    await page.goto(`${BASEURL}/react-admin-demo`, {
      waitUntil: "networkidle",
    });
  });

  it("should be able to login", async () => {
    await page.fill('input[name="username"]', "demo");
    await page.fill('input[name="password"]', "demo");
    await page.click('text="Sign in"');

    const profileHeader = await page.$('[aria-label="Profile"]');
    expect(await profileHeader?.textContent()).toContain("Jane Doe");
  });
});
