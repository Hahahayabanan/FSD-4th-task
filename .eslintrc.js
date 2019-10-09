module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
    jasmine: true,
  },
  extends: [
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
  ],
  rules: {
    'linebreak-style':'off',
    'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
    'class-methods-use-this': 'off',
    'no-new': 'off',
    'no-underscore-dangle': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'import/extensions': [2, 'ignorePackages'],
    'consistent-return': [1],
    'no-dupe-class-members': 'off'
  }
};