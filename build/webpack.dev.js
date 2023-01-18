const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const { Configuration } = require("webpack");
// 不刷新网页 保留组件状态的热更新
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

/**
 * @type {Configuration}
 */
const devConfig = {
    // webpack会自动注入到 process.env.NODE_ENV
    // webpack打包前(webpack config, babel config)还不能访问到NODE_ENV,所以在跑script时通过cross-env注入变量
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        port: 9527,
        // 开发环境关闭gzip,提升热更新速度
        compress: false,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "../public"),
        },
    },
    plugins: [new ReactRefreshWebpackPlugin()],
};

module.exports = merge(baseConfig, devConfig);
