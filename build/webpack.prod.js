const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const { Configuration } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
        minimizer: [new CssMinimizerPlugin()],
    },
};

module.exports = merge(baseConfig, prodConfig);
