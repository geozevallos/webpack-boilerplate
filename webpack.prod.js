const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: 'production',
    output: {
        filename: 'main.[hash].js',
        assetModuleFilename: 'assets/[hash][ext][query]'
    },
    optimization:{
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
    },
    module: {
        rules: [
            // Babel
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],  
            },
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
            filename: '[name].[hash].css',
            ignoreOrder: false
        }),

        // new CopyPlugin({
        //     patterns: [
        //         { from: 'src/assets', to: 'assets/' },
        //     ]
        // })
    ]
}