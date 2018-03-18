var slsw = require('serverless-webpack')
var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(m)?js$/,
        loader: 'babel-loader!shebang-loader',
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
}
