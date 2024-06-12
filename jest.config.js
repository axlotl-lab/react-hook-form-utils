/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    // All imported modules in your tests should be mocked automatically
    // automock: false,
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    preset: "ts-jest",
  }
}