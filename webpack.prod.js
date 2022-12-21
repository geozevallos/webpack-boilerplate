const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        filename: 'main.[contentHash].js',
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    optimization:{
        minimizer: [new CssMinimizerPlugin(),]
    },
    module: {
        rules: [
            // css dinámico
            {
                test: /\.css$/i,
                exclude: /styles\.css$/,
                use: ["style-loader", "css-loader"],
            },
            // css especifico
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            // Imagenes
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css',
            ignoreOrder: false
        }),
        // new CopyPlugin({
        //     patterns: [
        //         { from: 'src/assets', to: 'assets/' },
        //     ]
        // })
    ]
}