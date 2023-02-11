const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const isDevelopment = env.env !== "production";
  return {
    entry: path.resolve(__dirname, "..", "./src/index.tsx"),
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve("babel-loader"),
            },
          ],
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    output: {
      path: path.resolve(__dirname, "..", "./build"),
      filename: "bundle.js",
    },
    mode: "development",
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "..", "./public/index.html"),
      }),
    ],
  };
};
