const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js",
    DOM: "./src/DOMs.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/art__generator/",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
