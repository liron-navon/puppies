module.exports = {
  preset: "ts-jest/presets/js-with-babel",
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  globalSetup: "jest-environment-puppeteer/setup",
  globalTeardown: "jest-environment-puppeteer/teardown",
  testEnvironment: "jest-environment-puppeteer",
  transformIgnorePatterns: [
    "node_modules/(?!(lit-element|lit|reactive-element|@lit|lit-html)/)"
  ],
  globals: {
    TEST_ENV_URL: `http://localhost:${process.env.PORT || 6006}/iframe.html`,
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  }
}
