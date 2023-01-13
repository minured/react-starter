const path = require("path");
// 把最终构建好的文件都引入到一个html中
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { Configuration } = require("webpack");

/**
 * 使用webpack config语法提示
 * @type {Configuration}
 */
module.exports = {
    entry: path.join(__dirname, "../src/index.tsx"),
    output: {
        filename: "static/js/[name].js",
        path: path.join(__dirname, "../dist"),
        // webpack4需要配置clean-pack-plugin删除dist, webpack5内置
        clean: true,
        publicPath: "/",
    },

    module: {
        // 总体从上往下,从右往左执行
        rules: [
            {
                test: /.(ts|tsx)$/,
                use: ["babel-loader"],
            },
            // sass同理
            {
                test: /.(css|less)$/,
                // css-loader 解析.css
                // style-loader把css插入到style标签
                use: [
                    "style-loader",
                    "css-loader",
                    // postcss 兼容不同浏览器, 读取根目录的postcss.config.js配置
                    "postcss-loader",
                    "less-loader",
                ],
            },
        ],
    },

    resolve: {
        // 引入模式时会按以下顺序 加后缀寻找文件
        extensions: [".js", ".tsx", ".ts"],
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, "../public/index.html"),
            // 自动注入静态资源
            inject: true,
        }),
        new webpack.DefinePlugin({
            "process.env.APP_ENV": JSON.stringify(process.env.APP_ENV),
        }),
    ],
};
