const path = require("path");
const { merge } = require("webpack-merge");
const { modules } = require("./webpack.base");
const baseConfig = require("./webpack.base");
const { Configuration } = require("webpack");

/**
 * @type {Configuration}
 */
const devConfig = {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        port: 3000,
        // 开发环境关闭gzip,提升热更新速度
        compress: false,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "../public"),
        },
    },
};

module.exports = merge(baseConfig, devConfig);
