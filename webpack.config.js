const path = require("path");

module.exports = {
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
  resolve: {
    alias: {
      "react-pdf/dist/esm/entry.webpack": "react-pdf", // Ensure this line is present
    },
  },
};
