// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

//const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isProduction =
  process.env.SERVER == "production" || process.env.SERVER == "test";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "public"),
    filename: pathData => {
      if (isProduction) {
        return pathData.chunk.name === "main"
          ? "[name].[contenthash].bundle.js"
          : "[name]/[name].[contenthash].bundle.js";
      } else {
        return pathData.chunk.name === "main"
          ? "[name].bundle.js"
          : "[name]/[name].bundle.js";
      }
    }
  },

  devServer: {
    host: "localhost",
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body",
      hash: true,
      prefetch: {
        chunks: ["vendor"]
      }
    }),

    new MiniCssExtractPlugin()

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  devtool: isProduction ? "source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Aplica esta regla a archivos .ts y .tsx
        use: "ts-loader", // Usa ts-loader para procesar TypeScript
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset"
      },

      {
        test: /\.svg$/,
        use: ["@svgr/webpack", "url-loader"]
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  }
};

module.exports = () => {
  let devPlugins = [];
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
    devPlugins = [new HotModuleReplacementPlugin(), new ReactRefreshPlugin()];
  }

  devPlugins.forEach(plugin => config.plugins.push(plugin));

  return config;
};
