const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'dest'),
    filename: 'bundle.js'
  }
}
