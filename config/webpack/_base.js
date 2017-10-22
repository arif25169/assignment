import path from 'path';
import webpack from 'webpack';

import config from '../';

export default {
  target: 'web',
  devtool: '#source-map',
  entry: {
    bundle: [path.join(config.get('dir_src'), 'js', 'index.jsx')],
  },
  output: {
    path: path.join(config.get('dir_dist'), config.get('globals').__BASE__, 'js'),
    pathInfo: true,
    publicPath: `/${path.join(config.get('globals').__BASE__, 'js/')}`,
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: ['node_modules'],
        include: `${config.get('dir_src')}/js`,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        },
        {
            test: /\.less$/,
            loader: 'style!css!less?includePaths=my/path'
        },
        {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: config.get('globals').__BASE__
            }
        }
    ],
    noParse: [/\.min\.js$/],
  },
  resolve: {
    extentions: ['', '.js', '.jsx'],
    modulesDirectories: ['web_modules', 'node_modules'],
    alias: {
      react: path.resolve(path.join(config.get('path_project'), 'node_modules', 'react')),
      ducks: path.resolve(path.join(config.get('path_project'), 'src', 'js', 'ducks')),
      components: path.resolve(path.join(config.get('path_project'), 'src', 'js', 'components')),
      containers: path.resolve(path.join(config.get('path_project'), 'src', 'js', 'containers')),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.get('globals')['process.env'],
      __DEV__: JSON.stringify(config.get('globals').__DEV__),
      __PROD__: JSON.stringify(config.get('globals').__PROD__),
      __DEBUG__: JSON.stringify(config.get('globals').__DEBUG__),
      __BASE__: JSON.stringify(config.get('globals').__BASE__),
    }),
  ],
};
