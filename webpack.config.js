// 引入自动生成HTML文件插件
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
// nide.js 原生方法，不需要install
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('style/main.css');
var utils = require('./build/utils.js');

var env = process.env.NODE_ENV;
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap);
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap);
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd;

module.exports = {
    // 上下文，__dirname指项目的根目录
    context: __dirname,
    // 入口文件
    entry: './src/main.js',
    // {
    //
    //     main: './src/script/main.js',
    //     a: './src/script/a.js',
    //     b: './src/script/b.js',
    //     c: './src/script/c.js'
    // },
    // 输出文件
    output: {
        // 输出文件路径
        path: './dist',
        filename: 'static/js/[name].bundle.js'
        // 输出文件加上域名变成绝对路径
        // publicPath: 'http://www.163.com/'
    },
    resolve: {
        extensions: [
            '', '.js', '.vue', '.json'
        ],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'common': path.resolve(__dirname, '../src/common'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    //   resolve: { fallback: path.join(__dirname, "node_modules") },
    // resolveLoader: { fallback: path.join(__dirname, "node_modules") },
    resolve: {
        extensions: ['', '.js', '.vue', '.json'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'common': path.resolve(__dirname, '../src/common'),
            'components': path.resolve(__dirname, '../src/components')
        }
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            // 以.js结尾的文件 用babel-loader处理
            test: /\.js$/,
            // 指定loader处理的文件,__dirname指当前运行环境路径，加上后面的参数路径，解析成绝对路径
            include: path.resolve(__dirname, 'src/'),
            // 不用loader处理的文件,__dirname指当前运行环境路径，加上后面的参数路径，解析成绝对路径
            exclude: path.resolve(__dirname, 'node_modules'),
            loader: 'babel-loader!eslint-loader'
        }, { // 处理html模板文件
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.css$/,
            // 从右到左调用处理
            loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss')
            // 'style!css?importLoaders=1!postcss'
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            // 'style!css!postcss!sass'
        }, {
            test: /\.less$/,
            loader: 'style!css!postcss!less'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            // 处理图片文件
            test: /\.(png|jpe?g|gif|svg)$/i,
            loaders: ['url-loader?limit=100&name=img/[name].[hash:5].[ext]', 'image-webpack-loader']

        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: 'fonts/[name].[hash:7].[ext]'
            }
        }]
    },
    postcss: [require('autoprefixer')({
        browsers: ['last 5 versions']
    })],
    // eslint: {
    //     configFile: './.eslintrc.js'
    // },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: useCssSourceMap
        }),
        postcss: [require('autoprefixer')({
            browsers: ['last 2 versions', 'Android >= 4.0']
        })]
    },
    plugins: [
        // extractCSS,
        new ExtractTextPlugin(utils.assetsPath('css/[name].css'), {
            allChunks: false
        }),
        // js,css压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true, // 这里的soucemap 不能少，可以在线上生成soucemap文件，便于调试
            mangle: true
        }),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
        // new htmlWebpackPlugin({
        //     //输出HTML文件名称
        //     filename: 'a.html',
        //     // 模板文件
        //     template: 'index.html',
        //     //自定义html title名称
        //     title: 'this is a.html',
        //     //js文件引入生成html文件位置   默认引入body;值为false时不引入
        //     inject: 'body',
        //     //干掉空格和注释
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true
        //     },
        //     //指定注入哪些脚本
        //   // chunks: ['main','a'],
        //     //指定排除哪些脚本
        //     excludeChunks:['b','c']
        //
        // }),
        // new htmlWebpackPlugin({
        //     //输出HTML文件名称
        //     filename: 'b.html',
        //     // 模板文件
        //     template: 'index.html',
        //     //自定义html title名称
        //     title: 'this is b.html',
        //     //js文件引入生成html文件位置   默认引入body;值为false时不引入
        //     inject: 'body',
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true
        //     },
        //     //指定注入哪些脚本
        //     // chunks: ['b'],
        //     //指定排除哪些脚本
        //     excludeChunks:['a','c']
        //
        // }),
        // new htmlWebpackPlugin({
        //     //输出HTML文件名称
        //     filename: 'c.html',
        //     // 模板文件
        //     template: 'index.html',
        //     //自定义html title名称
        //     title: 'this is c.html',
        //     //js文件引入生成html文件位置   默认引入body;值为false时不引入
        //     inject: 'body',
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true
        //     },
        //     //指定注入哪些脚本
        //    // chunks: ['c'],
        //    //指定排除哪些脚本
        //    excludeChunks:['a','b']
        //
        // })

    ]
};