const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { Configuration } = require("webpack");
const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const smp = new SpeedMeasurePlugin();

/**
 * @type {Configuration}
 */
const analyzeConfig = {
    plugins: [new BundleAnalyzerPlugin()],
};

module.exports = smp.wrap(merge(prodConfig, analyzeConfig));
