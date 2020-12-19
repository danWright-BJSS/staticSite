const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry_dir = './src/app.js';
const outputPath = path.join(__dirname, 'dist');

module.exports = {
    entry: entry_dir,
    output: {
        path: outputPath,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
             { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: "babel-loader" } }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        })
    ],
    devServer: {
        contentBase: outputPath,
        open: true,
        port: 3030
    }
}