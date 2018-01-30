var path = require('path');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2' // THIS IS THE MOST IMPORTANT LINE! :mindblow: I wasted more than 2 days until realize this was the line most important in all this guide.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
           options: { presets: ['es2015'] }
        }
      },
      {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /(node_modules|bower_components|build)/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        }
    ]
  },
  plugins: [
  new webpack.DefinePlugin({ //<--key to reduce React's size
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
   new ExtractTextPlugin("styles.css"),


],

externals: {
   react: {
     root: 'React',
     commonjs2: 'react',
     commonjs: 'react',
     amd: 'react',
     umd: 'react',
   },
   'react-dom': {
     root: 'ReactDOM',
     commonjs2: 'react-dom',
     commonjs: 'react-dom',
     amd: 'react-dom',
     umd: 'react-dom',
   },

           "react-datetime":"react-datetime",
           "moment":"moment",
           "drag-drop-touch-polyfill":"drag-drop-touch-polyfill",

       },
};
