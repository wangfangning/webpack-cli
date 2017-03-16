//引入自动生成HTML文件插件
var htmlWebpackPlugin = require('html-webpack-plugin');
//nide.js 原生方法，不需要install
var path = require('path');

module.exports = {
    //上下文，__dirname指项目的根目录
    context: __dirname,
    // 入口文件
    entry: './src/app.js',
    // {
    //
    //     main: './src/script/main.js',
    //     a: './src/script/a.js',
    //     b: './src/script/b.js',
    //     c: './src/script/c.js'
    // },
    //输出文件
    output: {
        //输出文件路径
        path: './dist',
        filename: 'js/[name].bundle.js'
        //输出文件加上域名变成绝对路径
        // publicPath: 'http://www.163.com/'
    },
  //   resolve: { fallback: path.join(__dirname, "node_modules") },
  // resolveLoader: { fallback: path.join(__dirname, "node_modules") },
    //   resolve: {
    //   extensions: ['', '.js', '.vue', '.json'],
    //   fallback: [path.join(__dirname, '../node_modules')],
    //   alias: {
    //     'src': path.resolve(__dirname, '../src'),
    //     'common': path.resolve(__dirname, '../src/common'),
    //     'components': path.resolve(__dirname, '../src/components')
    //   }
    // },
    module: {
        loaders: [
            {
                //以.js结尾的文件 用babel-loader处理
                test: /\.js$/,
                //指定loader处理的文件,__dirname指当前运行环境路径，加上后面的参数路径，解析成绝对路径
                include: path.resolve(__dirname, 'src/'),
                //不用loader处理的文件,__dirname指当前运行环境路径，加上后面的参数路径，解析成绝对路径
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel'
            }, { //处理html模板文件
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.css$/,
                //从右到左调用处理
                loader: 'style!css?importLoaders=1!postcss'
            }, {
                test: /\.scss$/,
                loader: 'style!css!postcss!sass'
            }, {
                test: /\.less$/,
                loader: 'style!css!postcss!less'
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
              //处理图片文件
                test: /\.(png|jpe?g|gif|svg)$/i,
                loaders: ['url-loader?limit=8000&name=img/[name].[hash:5].[ext]',
                          'image-webpack-loader'
              ]

            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    postcss: [require('autoprefixer')({browsers: ['last 5 versions']})],
    plugins: [
        new htmlWebpackPlugin({filename: 'index.html', template: 'index.html', inject: 'body',minify: {
                removeComments: true,
                 collapseWhitespace: true
            }}

      )
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
