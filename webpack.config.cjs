const path = require("path")

module.exports = {
  experiments: {
    outputModule: true
  },
  entry: path.resolve(__dirname, "./packages/html/_src/render.ts"),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            declarationDir: "build/dts"
          }
        }
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  optimization: undefined,
  resolve: {
    extensions: [".ts"]
  },
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "./packages/html/build/web"),
    filename: "index.js",
    library: {
      type: "module"
    }
  },
  mode: "development",
  target: "web"
}
