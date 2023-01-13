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
        rules: [
            {
                test: /.(ts|tsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        // 从右到左,先处理ts,再处理jsx
                        presets: ["@babel/preset-react", "@babel/preset-typescript"],
                    },
                },
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
