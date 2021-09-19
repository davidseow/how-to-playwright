module.exports = {
  preset: "jest-playwright-preset",
  verbose: true,
  transform: {
    "^.+\\.ts$": "babel-jest",
  },
  testEnvironment: "./jest.custom-environment.js",
};
