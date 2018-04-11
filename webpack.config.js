const path = require('path'),
    webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    "entry": {
        index: ["./react/src/App.jsx"],
        "vendor": [
            "react",
            "redux",
            "react-redux",
            "react-dom",
            "lodash"
        ]
    },
    "resolve": {
        "extensions": ['.js', '.jsx']
    },
    "output": {
        "path": path.resolve(__dirname, "react/build"),
        "filename": "js/[name].js"
    },
    "module": {
        "loaders": [{
            "test": /\.(js|jsx)$/,
            "exclude": /node_modules/,
            "loader": "babel-loader"
        }, {
            "test": /\.(sass|scss)$/,
            "use": ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader'],
                fallback: 'style-loader'
            }),
        }]
    },
    "plugins": [
        new ExtractTextPlugin({
            filename: 'css/index.css',
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: "demos",
            template: "index.html"
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "js/bundle.js" })
    ]
}
module.exports = config