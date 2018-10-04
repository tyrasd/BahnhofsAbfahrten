// @flow
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN_CLIENT),
      SENTRY_RELEASE: JSON.stringify(process.env.SENTRY_RELEASE),
    },
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/client/index.html'),
    minify: {
      collapseWhitespace: true,
      removeComments: true,
    },
  }),
];

const optimization = {};

const rules = [
  {
    test: /\.jsx?$/,
    use: ['babel-loader'],
  },
  {
    test: /\.s?css$/,
    use: [
      {
        loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      },
      { loader: 'css-loader' },
      { loader: 'postcss-loader' },
      { loader: 'sass-loader' },
    ],
  },
  {
    test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
    loader: 'url-loader?limit=100000',
  },
];

if (isDev) {
  plugins.push(...[new webpack.HotModuleReplacementPlugin()]);

  rules.forEach(r => r.use && r.use.unshift({ loader: 'cache-loader' }));
} else {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id]-[hash].css',
    }),
    new UglifyJsPlugin({
      // cache: true,
      parallel: true,
      extractComments: true,
    })
  );
  optimization.minimizer = [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
    }),
  ];
}

if (process.env.SENTRY_RELEASE) {
  plugins.push(
    new SentryCliPlugin({
      release: process.env.SENTRY_RELEASE,
      include: './src/client',
      ignore: ['node_modules', 'webpack.config.js'],
    })
  );
}

module.exports = {
  plugins,
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'source-map' : false,
  entry: './src/client/index.jsx',
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      'lodash-es': 'lodash',
      AppState: 'client/AppState',
    },
  },
  output: {
    path: path.resolve('dist/client'),
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  module: {
    rules,
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist/client'),
    historyApiFallback: true,
    inline: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9042',
      },
    },
  },
};
