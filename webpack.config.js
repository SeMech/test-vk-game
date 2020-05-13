const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const commonConfig = {
    entry: './src/index.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: [ '.jsx', '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/,
                exclude: /node_modules/,
                loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',]
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                exclude: nodeModulesPath,
            },
            {
                test: /\.(jpg|jpeg|png|eot|ttf|otf|woff|woff2|svg)$/,
                loader: `file-loader`,
                options: {
                    name: '[md5:hash:hex:30].[ext]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            filename: 'index.html',
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].[hash].css',
        })
    ],
    devServer: {
        contentBase: false,
        index: 'index.html',
        historyApiFallback: true,
        open: false,
        host: '0.0.0.0',
    },
    devtool: 'source-map',
};

module.exports = () => {
    return [commonConfig];
};
