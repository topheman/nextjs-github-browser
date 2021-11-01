module.exports = {
  // next/babel presets needed to match transpilation (see explanation in .babelrc.ignored)
  mode: "development",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["next/babel", "@babel/preset-env"],
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["next/babel", "@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
};
