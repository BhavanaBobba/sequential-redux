const webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        './public/scripts/main',
    ],
    module: {
        loaders: [
            {test: /.json$/, loader: 'json'},
            {test: /.jsx?$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /\.less$/,
                loader: ["style-loader", "css-loader","less-loader"],
            }
        ],
    },
    output: {
        filename: 'bundle.js',
        path: "./public/scripts/",
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.IgnorePlugin(/regenerator|nodent|js-beautify/, /ajv/),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            dead_code: true,
            minimize: true,
        }),
    ],
    resolve: {
        extensions: [
            '',
            '.js',
            '.json',
            '.jsx',
        ],
    },
}