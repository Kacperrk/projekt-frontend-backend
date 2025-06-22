module.exports = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules/(?!axios).+\\.js$'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
