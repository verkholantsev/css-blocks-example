var webpack = require('webpack');
const { Rewriter, Analyzer } = require('@css-blocks/jsx');
const { CssBlocksPlugin } = require('@css-blocks/webpack');

const cssBlocksRewriter = require('@css-blocks/jsx/dist/src/transformer/babel')

const jsxCompilationOptions = {
  compilationOptions: {},
  optimization: {
    rewriteIdents: true,
    mergeDeclarations: true,
    removeUnusedStyles: true,
    conflictResolution: true
  }
};

const rewriter = new Rewriter();
const analyzer = new Analyzer(
  __dirname + '/src/index.js',
  jsxCompilationOptions
);

module.exports = {
  entry: ['./src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ["env", "react"],
              cacheDirectory: true,
              compact: true
            }
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                cssBlocksRewriter.makePlugin({ rewriter })
              ],
              parserOpts: {
                plugins: ['jsx', 'dynamicImport']
              }
            }
          },
          {
            loader: require.resolve('@css-blocks/webpack/dist/src/loader'),
            options: {
              analyzer,
              rewriter
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CssBlocksPlugin({
      analyzer,
      outputCssFile: 'index.css',
      compilationOptions: jsxCompilationOptions.compilationOptions,
      optimization: jsxCompilationOptions.optimization
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname + '/build',
    filename: 'index.js'
  },
  devServer: {
    contentBase: './build'
  }
};
