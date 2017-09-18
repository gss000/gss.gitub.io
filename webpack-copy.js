var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
// 使用CommonsChunkPlugin的插件，用于提取多个入口文件的公共脚本部分，然后生成一个common.js来方便多页面之间的复用

module.exports = {
    //插件
    plugins: [commonsPlugin],

    //页面入口文件配置
    entry:{
        //入口文件，书写主文件名字和js一样
        main: './js/main.js'
        //支持数组形式和对象模式，将加载数组中的所有模块，但以最后一个模块作为输出
        // page2: ["./entry1", "./entry2"]
        // page3： {"./main.js", ["./page1.js", "./page2.js"]}
    },
    //入口文件输出配置
    output:{
        path: 'dist/js/page',
        filename: '[name].js'
        //当入口文件有多个时且输出多个时，那么需要以下格式，可查看官方文档
        // filename: '[name]-[chunkhash].js'  输出：名字+哈希值(md5 不重复)
    },

    module: {
        //加载配置器
        loaders: [
            //.css 文件使用 style-loader 和 css-loader 来处理
            { test:/\.css$/, loader: 'style-loader!css-loader' },
            //.js 文件使用 jsx-loader 来编译处理
            { test:/\.js$/, loader: 'jsx-loader?harmony' },
            //.scss 文件使用 style-loader、 css-loader 和 sass-loader 来编译处理
            { test:/\.scss$/, loader: 'style!css!sass?sourceMap' },
            //图片文件使用 url-loader 来处理， 小于8kb的直接转换为base64
            { test:/\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
        ]
    },

    //其他解决方案配置
    resolve:{
        //查找module的话从这里开始查找
        root: '...',//绝对路径
        //自动扩展文件后缀名，意味着我们require模块可以省略不写猴嘴名
        extensions:['', '.js', '.json', '.scss'],
        //模块别名定义，方便后续直接引用别名，无需多写长长的地址
        alias:{
            AppStore: 'js/stores/AppStores.js',//后续直接require('AppStore')即可
            ActionType: 'js/actions/ActionType.js',
            AppAction: 'js/actions/Appaction.js'
        }
    }
}