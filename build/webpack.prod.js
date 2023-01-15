const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const { Configuration } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
};

module.exports = merge(baseConfig, prodConfig);
