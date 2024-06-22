const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyWebpack = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const TerserWebpack = require("terser-webpack-plugin");

module.exports = {
	mode: 'production',
	output: {
		clean: true,
		filename: '[name].[contenthash].js'
	},
	plugins: [
		new HtmlWebpack({
			filename: 'index.html',
			template: './src/index.html',
		}),
		new MiniCssExtract({
			filename: '[name].[fullhash].css',
			ignoreOrder: false,
		}),
    new CopyWebpack({
      patterns: [
        { from: "./src/assets/", to: "assets/" },
      ],
    }),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					sources: false,
					minimize: true,
				}
			},
			{
				test: /\.css$/i,
				exclude: /styles.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /styles.css$/,
				use: [MiniCssExtract.loader, 'css-loader'],
			},
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizer(),
			new TerserWebpack(),
		]
	},
};