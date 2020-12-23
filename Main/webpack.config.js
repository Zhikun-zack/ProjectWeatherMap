const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const rootPath = "./";

module.exports = [
  {
    context: __dirname,
    entry: {
      app: rootPath + "index.js"
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),

      // Needed  for multiline strings
      sourcePrefix: ""
    },
    amd: {
      // Enable webpack-friendly use of require in
      toUrlUndefined: true
    },
   
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|gif|jpg|jpeg|svg|xml|json|gltf)$/,
          use: ["url-loader"]
        },
  
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: rootPath + "index.html"
      }),
      // Copy Assets, Widgets, and Workers to a static directory
      new CopyWebpackPlugin({
        patterns: [
        { from: "libs", to: "libs" },
        { from: "images", to: "images" },
        { from: "styles", to: "styles" }
      ],
    }),
      new webpack.DefinePlugin({
        // Define relative base path in  for loading assets
        _BASE_URL: JSON.stringify("")
      }),
      // Split  into a seperate bundle
      
    ],
    
    // development server options
    devServer: {
      // Send API requests on localhost to API server get around CORS.
      proxy: {
        '/dataGis': {
          target: 'http://data.cma.cn/dataGis',
          changeOrigin: true,
          pathRewrite: {'^/dataGis' : ''}
        }
      },
      contentBase: path.join(__dirname, "dist")
    }
    
  }
];
