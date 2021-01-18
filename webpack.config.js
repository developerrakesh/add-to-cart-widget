const currentTask = process.env.npm_lifecycle_event;
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fse = require('fs-extra');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap('Copy images', () => {
            fse.copySync('./app/assets/images', './docs/assets/images');
            fse.copySync('./app/cart.json', './docs/cart.json');
        });
    }
}

let pages = fse.readdirSync('./app').filter(file => {
    return file.endsWith('.html')
}).map(page => {
    return new HtmlWebpackPlugin({
        filename: page,
        scriptLoading: 'defer',
        template: `./app/${page}`
    });
});

if (currentTask == 'dev') {
    module.exports = {
        entry: './app/assets/scripts/app.js',
        plugins: pages,
        output: {
            filename: 'bundled.js',
            path: path.resolve(__dirname, 'app')
        },
        devServer: {
            before: function(app, server) {
                server._watch('app/**/*.html');
            },
            contentBase: path.join(__dirname, 'app'),
            port: 3000,
            hot: true,
            host: '0.0.0.0'
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        'css-loader?url=false',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        'autoprefixer'
                                    ]
                                }
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        }
    }
}

if (currentTask == 'build') {
    module.exports = {
        entry: './app/assets/scripts/app.js',
        plugins: pages.concat(
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
            new RunAfterCompile()
        ),
        output: {
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js',
            path: path.join(__dirname, 'docs')
        },
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    exclude: /(node_modules)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader?url=false',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        'autoprefixer'
                                    ]
                                }
                            }
                        },
                        'sass-loader'
                    ]
                }
            ]
        },
        optimization: {
            splitChunks: { chunks: 'all' },
            minimizer: [ new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin() ]
        }
    }
}

