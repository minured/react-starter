const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { Configuration } = require("webpack");
const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod");

const smp = new SpeedMeasurePlugin();

/**
 * @type {Configuration}
 */
const analyzeConfig = {};

module.exports = smp.wrap(merge(prodConfig, analyzeConfig));
