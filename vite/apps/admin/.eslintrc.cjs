/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@mila/eslint-config/index.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react-refresh/only-export-components': 'off',
  },
};
