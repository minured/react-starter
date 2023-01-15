const path = require("path");
// 把最终构建好的文件都引入到一个html中
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { Configuration } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

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
                // 后续可以分开ts与tsx的解析, 自定义babel-loader
                // https://webpack.docschina.org/loaders/babel-loader/#customized-loader
                test: /.(ts|tsx)$/,
                // 多线程loader启动也需要时间,适合大型应用
                use: ["thread-loader", "babel-loader"],
                // 只对src下ts使用loader
                include: [path.join(__dirname, "../src")],
            },

            // sass同理
            // 分开css/less 为了避免less-loader解析.css文件,优化效果的多寡需要看项目复杂度,需要实测,小项目为了方便不需要分开
            {
                test: /.css$/,
                // css-loader 解析.css
                // style-loader把css插入到style标签
                use: [
                    // 开发环境插入style标签,方便热更新, 生产环境抽离.css文件
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    // postcss 兼容不同浏览器, 读取根目录的postcss.config.js配置
                    "postcss-loader",
                ],
            },
            {
                test: /.less$/,
                use: [
                    isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
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
        // 第三方模块只在根目录的node_modules查找,缩小搜索范围
        modules: [path.join(__dirname, "../node_modules")],
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
