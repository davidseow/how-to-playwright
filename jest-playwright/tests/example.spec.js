beforeAll(async () => {
  await page.goto("https://playwright.dev/");
});

test("should be able to see search suggestion", async () => {
  const searchInput = await page.$('input[aria-label="Search"]');
  await searchInput.type("test");
  await page.press('input[aria-label="Search"]', "Enter");
  const searchSuggestion = await page.waitForSelector("[id^='searchBar']");
  expect(await searchSuggestion.textContent()).toMatch("test");
});
