describe("Dashboard", () => {
  const { BASEURL } = process.env;

  beforeAll(async () => {
    // TODO: run this once before all test and reuse context
    await page.goto(`${BASEURL}/react-admin-demo/#/`, {
      waitUntil: "networkidle",
    });

    // login
    await page.fill('input[name="username"]', "demo");
    await page.fill('input[name="password"]', "demo");
    await page.click('text="Sign in"');

    const profileHeader = await page.$('[aria-label="Profile"]');
    expect(await profileHeader?.textContent()).toContain("Jane Doe");
  });

  it("should display dashboard", async () => {
    const pageCard = await page.$("#main-content .MuiPaper-elevation1");
    expect(await pageCard.textContent()).toContain(
      "Welcome to the react-admin e-commerce demo"
    );
  });
});
