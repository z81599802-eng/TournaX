const baseConfig = require('./base.cjs');

module.exports = {
  ...baseConfig,
  env: {
    ...baseConfig.env,
    node: true
  },
  rules: {
    ...baseConfig.rules,
    'unicorn/no-process-exit': 'off'
  }
};
