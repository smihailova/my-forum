const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CopyWebpackPluginConfig = new CopyWebpackPlugin([{
  from: __dirname + '/public/assets',
  to: 'assets'
}]);
const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/server/templates/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  context: path.join(__dirname, '/src/app'),
  entry: [
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?url=false',
          'resolve-url-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?url=false',
          'sass-loader',
          'resolve-url-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader'
      },
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules')
    ],
  },
  plugins: [
    HTMLWebpackPluginConfig,
    CopyWebpackPluginConfig
  ]
};
