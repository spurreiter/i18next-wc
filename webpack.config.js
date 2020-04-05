const path = require('path');
module.exports = {
  entry: {
    'dist/intl-message': './src/intl-message.ts',
    'dist/intl-datetime': './src/intl-datetime.ts',
    'dist/intl-number': './src/intl-number.ts',
    'dist/index': './src/index.ts',
    'examples/jsx': './test/jsx/test.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname)
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.js$/, use: ["source-map-loader"], enforce: "pre" }
    ]
  },
  devServer: {
    open: true
  },
  devtool: 'source-map'
}
