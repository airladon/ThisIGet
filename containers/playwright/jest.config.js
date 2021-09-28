module.exports = {
  preset: 'jest-playwright-preset',
  testRegex: [
    '/src/.*\\.btest\\.js',
    '.*\\.btest\\.js',
  ],
  testPathIgnorePatterns: ['/node_modules/', '\\.snap$'],
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium'],
    },
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};

