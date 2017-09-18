var webpack = require('webpack');
var commmonPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    entry: {
        main: './js/main.js'
    },
    output:{
        path: '.dist/js/page',
        filename: 'compress.js'
    },
    module:{
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.js$/, loader: 'jsx-loader?harmony'},
            {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    plugins: {
        main: './js/main.js'
    },
    resolve:{
        extensions: ['', '.js', '.json', '.scss']
    }

}