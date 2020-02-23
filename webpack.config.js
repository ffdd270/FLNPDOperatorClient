const path = require('path');
const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '/',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env', {
                        targets: { node: 'current' }, // 노드일 경우만
                        modules: 'false'
                    }
                    ],
                    '@babel/preset-react',
                    {
                        'plugins': ["@babel/plugin-proposal-class-properties"]
                    }
                ],
            },
            exclude: ['/node_modules'],
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }],
    },
    devServer: {
        publicPath: '/',
        contentBase: './public',
        historyApiFallback: true,
    },
    plugins: [ ],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
};