const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const { Configuration } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

/**
 * @type {Configuration}
 */
const prodConfig = {
    mode: "production",
    plugins: [
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css",
        }),
    ],
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
    },
};

module.exports = merge(baseConfig, prodConfig);
