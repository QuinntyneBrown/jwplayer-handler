﻿var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
    devtool: 'source-map',
    entry: {
        'jwplayerhandler': './src/bootstrap'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: "dist/",
        library: "jwplayerhandler"
    },
    resolve: {
        extensions: ['.ts', '.js', '.jpg', '.jpeg', '.gif', '.png', '.css', '.html']
    },
    module: {
        loaders: [
            { test: /\.scss$/, exclude: /node_modules/, loaders: ['raw-loader', 'sass-loader'] },
            { test: /\.(jpg|jpeg|gif|png)$/, loader: 'file-loader?name=img/[path][name].[ext]' },
            { test: /\.(eof|woff|woff2|svg)$/, loader: 'file-loader?name=img/[path][name].[ext]' },
            { test: /\.css$/, loader: 'raw-loader' },
            { test: /\.html$/, loaders: ['html-loader'] },
            { test: /\.ts$/, loaders: ['awesome-typescript-loader'], exclude: /node_modules/ }
        ]
    },
    plugins: [
    ]
};
