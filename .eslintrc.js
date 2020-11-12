module.exports = {
  extends: ['@philihp'],
  env: {
    browser: true,
  },
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-underscore-dangle': 'off',
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off', // turn off now, turn on maybe never?
    'unicorn/filename-case': 'off',
  },
  ignorePatterns: [
    'auth0/rules/*.js',
    'pages/examples/*.js',
    'components/examples/*.js',
  ],
  globals: {
    $subject: 'readonly',
    includeExamplesFor: 'readonly',
    itBehavesLike: 'readonly',
    its: 'readonly',
    sharedExamplesFor: 'readonly',
    subject: 'readonly',
  },
}
