const baseConfig = require('./base.cjs');

module.exports = {
  ...baseConfig,
  env: {
    ...baseConfig.env,
    browser: true
  },
  extends: [...baseConfig.extends, 'next', 'next/core-web-vitals', 'plugin:jsx-a11y/recommended'],
  plugins: [...new Set([...(baseConfig.plugins ?? []), 'jsx-a11y'])],
  rules: {
    ...baseConfig.rules,
    'react/jsx-props-no-spreading': 'off'
  }
};
