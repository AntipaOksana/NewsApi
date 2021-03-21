const path = require('path'),
    HTMLWebpackPlugin = require('html-webpack-plugin'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    devMode = process.env.NODE_ENV !== 'production',
    plugins = []


plugins.push(
    new CleanWebpackPlugin,
    new HTMLWebpackPlugin({
        template: './index.html'
    })
)

if (!devMode) {
    plugins.push(new MiniCssExtractPlugin());
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.js',
    output: {
        filename: '[name].[fullhash].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 7000
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }
}