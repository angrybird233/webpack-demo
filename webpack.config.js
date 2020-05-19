const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成一个新的html5文件,自动添加所依赖的js文件代码
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //每次打包前,清理所要输出的文件夹
const webpack = require('webpack');



module.exports = {
    mode: 'development', //环境: development/ production
    entry: './src/index.js', //定义打包入口,可以是多个入口
    // entry: ["./app/entry1", "./app/entry2"],
    // entry: {
    //     a: "./app/entry-a",
    //     b: ["./app/entry-b1", "./app/entry-b2"]
    // },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: "/dist/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:  /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'hello webpack demo'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin() //HMR模块热替换
    ],
    //devtool此选项控制是否生成以及如何生成source-map;
    // inline-source-map:将编译后的代码映射回原始源代码(开发环境)
    // source-map:将编译后的代码映射回原始源代码(生产环境)
    // eval: 生成后的代码(不能映射回去)(开发环境)
    // none: 生成后的代码(不能映射回去)(生产环境)
    devtool: 'inline-source-map', 
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: '8090',
        hot: true,
        compress: true,
        allowedHosts: ['tianyan.com'] ,
        // https: true 默认情况下，dev-server 通过 HTTP 提供服务。也可以选择带有 HTTPS 的 HTTP/2 提供服务：
        open: true, //配置启动时是否自动打开浏览器
        // publicPath: '/dist',
        proxy: { //定义跨域代理访问
            // "/api": {
            //     target: "http://localhost:8090",
            //     pathRewrite:{"^/api": ""}
            // }
        }
    },
    externals: { // 不要遵循/打包这些模块，而是在运行时从环境中请求他们
        // lodash,
        // vue-router
    },
    resolve: { //配置各个模块如何被解析
        extensions: [".js", ".json", "vue",".jsx", ".css"],
        alias:{ // 模块别名列表
            // "module": "new-module",
        }
    }
}