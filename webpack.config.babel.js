import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const createConfig = (env = 'development') => {
    return {
        entry: {
            script: './src/index.js',
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].js',
        },
        module: {
            rules: [{
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: ['style-loader'],
                    use: ['css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'],
                }),
            }, {
                test: /\.(woff|woff2|svg|jpg)$/,
                use: 'file-loader?name=[name].[ext]',
            }],
        },
        devtool: 'source-map',
        plugins: [
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            }),
            new ExtractTextPlugin({
                filename: '[name].[contenthash].css',
                allChunks: true,
                disable: env !== 'production',
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            new CopyWebpackPlugin([{
                context: './src/icons/',
                from: '**/*',
            }, {
                context: './src/images/',
                from: '**/*',
            }, {
                context: './src/favicon/',
                from: '**/*',
            }, {
                from: "./_redirects"
            }]),
        ],
    };
};

module.exports = createConfig;
