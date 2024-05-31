/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@vklink/eslint-config'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
  },
};
