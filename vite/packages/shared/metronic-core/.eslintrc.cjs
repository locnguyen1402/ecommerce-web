/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@mila/eslint-config'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
};
