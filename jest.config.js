module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['pages/**/*.js', 'components/**/*.js', 'lib/**/*.js'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/pages/test*.js',
    'setup-tests.js',
    'setup-tests-env.js',
  ],
  setupFiles: ['<rootDir>/setup-tests-env.js'],
  setupFilesAfterEnv: [
    'jest-enzyme',
    '<rootDir>/setup-tests.js',
    'bdd-lazy-var/global',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  testEnvironment: 'enzyme',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/mocks.js',
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/mocks.js',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironmentOptions: {
    // this is default, technically not required but when version change we dont wanna miss this.
    enzymeAdapter: 'react16',
  },
}
