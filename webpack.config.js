const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry_dir = './src/app.js';
const outputPath = path.join(__dirname, 'build');

module.exports = {
    entry: entry_dir,
    output: {
        path: outputPath,
        publicPath: '/',
        filename: 'app.js'
    },
    module: {
        rules: [
             { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: "babel-loader" } },
             { test: /\.(glb|gltf|obj)$/, exclude: /node_modules/, use: { loader: 'file-loader', options: { outputPath: 'assets/models', sourceMap: true } } }
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
        host: 'localhost',
        port: 3030
    }
}