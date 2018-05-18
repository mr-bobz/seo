var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src')
};

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: path.join(paths.SRC, 'client/index.jsx'),
    output: {
        path: paths.DIST,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                include: path.join(paths.SRC, 'client'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.(jp?g|png|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 25000,
                    fallback: 'file-loader'
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'public/index.html'),
            filename: 'index.html',
            inject: 'body'
        }),
    ],
};
