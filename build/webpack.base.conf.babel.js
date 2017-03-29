import path               from 'path'
import webpack            from 'webpack'

export default {
  // http://webpack.github.io/docs/configuration.html#node
  node: {
		__filename: false,
		__dirname: false
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '../dist/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [
      path.join(__dirname, '../node_modules')
    ],
    alias: {
      'dist': path.resolve(__dirname, '../dist'),
      'src': path.resolve(__dirname, '../src')
    }
  },
  target: 'web',  // important
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?presets[]=es2015&presets[]=stage-2',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          limit: 2000,
          name: 'assets/images/[name].[ext]' // 'assets/images/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)/, // if /\.(woff|woff2|eot|ttf|svg)$/ the font-awesome with url like xx.woff?v=4.7.0 can not be loaded
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test: /\.node$/,
        loader: 'node-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}
