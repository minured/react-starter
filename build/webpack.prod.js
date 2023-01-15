const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const { Configuration } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const globAll = require("glob-all");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const path = require("path");

/**
 * @type {Configuration}
 */
const prodConfig = {
    mode: "production",
    plugins: [
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash].css",
        }),
        // 清理无用css
        new PurgeCSSPlugin({
            // 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
            // 只打包这些文件中用到的样式
            // 使用第三方ui库配合safelist,避免删除库的类名
            // https://github.com/FullHuman/purgecss/tree/main/packages/purgecss-webpack-plugin
            paths: globAll.sync([
                `${path.join(__dirname, "../src")}/**/*.tsx`,
                path.join(__dirname, "../public/index.html"),
            ]),
        }),
    ],
    // 视实际情况,使用更多优化方法 https://webpack.docschina.org/configuration/optimization/
    optimization: {
        minimize: true,
        // webpack会默认在production模式中使用内置的terser-webpack-plugin压缩js,在配置了CssMinimizerPlugin后js压缩失效,需要手动配置js压缩
        // 虽然webpack5内置了terser 手动配置时仍需单独安装 https://webpack.docschina.org/plugins/terser-webpack-plugin/
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                // 多线程压缩
                parallel: true,
                terserOptions: {
                    compress: {
                        // 删除console.log
                        pure_funcs: ["console.log"],
                    },
                },
            }),
        ],
        // 分割代码
        splitChunks: {
            cacheGroups: {
                // 分离第三方模块
                vendors: {
                    test: /node_modules/, // 只匹配node_modules里面的模块
                    name: "vendors", // 提取文件命名为vendors,js后缀和chunkhash会自动加
                    minChunks: 1, // 只要使用一次就提取出来
                    chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                    priority: 1, // 提取优先级为1
                },
                // 分离公共代码
                commons: {
                    // 提取页面公共代码
                    name: "commons", // 提取文件命名为commons
                    minChunks: 2, // 只要使用两次就提取出来
                    // chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
                    minSize: 0, // 提取代码体积大于0就提取出来
                },
            },
        },
    },
};

module.exports = merge(baseConfig, prodConfig);
