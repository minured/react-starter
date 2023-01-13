module.exports = {
    presets: [
        [
            // 最新语法 => 低版本语法
            "@babel/preset-env",
            {
                // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
                // "targets": {
                //  "chrome": 35,
                //  "ie": 9
                // },
                useBuiltIns: "usage",
                // 垫片polyfill 用低版本语法实现 高版本的特性
                corejs: 3,
            },
        ],
        // jsx => js
        "@babel/preset-react",
        // ts => js
        "@babel/preset-typescript",
    ],
};
