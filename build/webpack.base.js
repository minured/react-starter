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
                // 多线程loader启动也需要时间,适合大型应用
                use: ["thread-loader", "babel-loader"],
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

            // webpack使用file-loader和url-loader处理图片文件
            // webpack5则使用自带的asset-module
            {
                test: /.(png|jpg|jpeg|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 小于10kb转换成base64
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: "static/images/[name][ext]",
                },
            },
            {
                // 匹配字体图标文件
                test: /.(woff2?|eot|ttf|otf)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: "static/fonts/[name][ext]",
                },
            },
            {
                // 匹配字体图标文件
                test: /.(woff2?|eot|ttf|otf)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: "static/fonts/[name][ext]",
                },
            },
            {
                // 匹配媒体文件
                test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
                generator: {
                    filename: "static/media/[name][ext]",
                },
            },
        ],
    },

    resolve: {
        // 引入模式时会按以下顺序 加后缀寻找文件
        extensions: [".js", ".tsx", ".ts"],
        alias: {
            "@": path.join(__dirname, "../src"),
        },
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
    cache: {
        type: "filesystem",
    },
};
