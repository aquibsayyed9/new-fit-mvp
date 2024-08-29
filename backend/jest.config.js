module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'], // Define where Jest should look for test files
    collectCoverage: true, // Optional: to collect code coverage
    coverageDirectory: 'coverage',
    verbose: true,
  };
  