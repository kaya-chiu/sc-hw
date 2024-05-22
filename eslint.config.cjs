const stylisticJs = require('@stylistic/eslint-plugin-js')

module.exports = {
  'plugins': {
    '@stylistic/js': stylisticJs
  },
  'rules': {
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    '@stylistic/js/object-curly-spacing': ['error', 'always', { 'objectsInObjects': false }]
  },
  'ignores': ['node_modules/*']
}