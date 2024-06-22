const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyWebpack = require("copy-webpack-plugin");

module.exports = {
	mode: 'development',
	output: {
		clean: true,
	},
	plugins: [
		new HtmlWebpack({
			//title: 'Webpack App',
			//filename: './index.html',
			template: './src/index.html',
		}),
		new MiniCssExtract({
			filename: '[name].css',
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
					minimize: false,
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
		],
	},
	optimization: {},
};