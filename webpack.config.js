const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development', // In developement mode, code will not be minified
    entry: [
        'react-hot-loader/patch',
        './src/jsx/index.jsx',
        './src/scss/main.scss'
    ],
    output: {
        path: path.resolve(__dirname + '/dist'),
        // publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '/dist'),
        // hot: true,
        watchContentBase: true,
        compress: true, // Enable gzip compression for everything served
        port: 9000
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.s[ac]ss$/, // allow both sass and scss files
                // use: ['style-loader', 'css-loader', 'sass-loader']
                use: [
                    'style-loader', // creates style nodes from JS strings
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
  };