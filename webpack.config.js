const webpack = require('webpack');
module.exports = {
    mode: 'development',
    entry: {
        app: ['./src/index.js', 'react-router-dom' ] ,
    },
    output: {
        path: '/dist',
        filename: '[name].js',
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
        }],
    },
    plugins: [ ],
    optimization: {},
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx'],
    },
};