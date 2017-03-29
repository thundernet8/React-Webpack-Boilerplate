import path                           from 'path'
import webpack                        from 'webpack'
import baseConfig                     from './webpack.base.conf.babel'
import HtmlWebpackPlugin              from 'html-webpack-plugin'
import merge                          from 'webpack-merge'
import OptimizeCssAssetsPlugin        from 'optimize-css-assets-webpack-plugin'
import ExtractTextPlugin              from 'extract-text-webpack-plugin'

baseConfig.entry = {}

let appProdConfig = {
  // whether to generate source map for production files.
  // disabling this can speed up the build.
  devtool: false, // '#source-map',

  entry: {
    app: [
        'babel-polyfill',
        './src/index.jsx'
    ]
  },

  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[id].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader?presets[]=react&presets[]=es2015&presets[]=es2017&presets[]=stage-2',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader'})
      },
      {
        test: /\.css$/,
        exclude: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'})
      },
      {
        test: /\.less$/,
        include: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader!less-loader'})
      },
      {
        test: /\.less$/,
        exclude: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!less-loader'})
      },
      {
        test: /\.scss$/,
        include: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap!postcss-loader!sass-loader'})
      },
      {
        test: /\.scss$/,
        exclude: [/global/, /node_modules/],
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader'})
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // 生产环境抽离样式至单独文件
    new ExtractTextPlugin({filename: 'style.min.css', disable: false, allChunks: true}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.min\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      bodyClass: `platform_${process.platform}`
    })
  ]
}

export default merge(baseConfig, appProdConfig)
