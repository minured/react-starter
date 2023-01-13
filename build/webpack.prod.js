const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const { Configuration } = require("webpack");

/**
 * @type {Configuration}
 */
const prodConfig = {
    mode: "production",
};

module.exports = merge(baseConfig, prodConfig);
