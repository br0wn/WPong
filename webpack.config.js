/**
 * Created by br0wn on 2/3/16.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/html/js',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, "resources/js/app")
                ],
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            }
        ]
    },
    //externals: {
    //    // require("jquery") is external and available
    //    //  on the global var jQuery
    //    "jquery": "jQuery"
    //},
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};