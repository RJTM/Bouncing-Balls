const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
  inject: 'body'
})

let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
            { 
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'autoprefixer-loader', 'sass-loader'],
                    fallback: 'style-loader'
                }),
                exclude: /node_modules/
            },
            { 
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                    use: ['css-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                loaders: [
                'file-loader',
                {
                    loader: 'image-webpack-loader',
                    query: {
                        progressive: true,
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                        }
                    }
                }
                ]
            }
        
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new ExtractTextPlugin('styles.css')
    ]
}

module.exports = config;