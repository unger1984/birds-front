/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const SvgStore = require('@unger1984/webpack-svgstore');
const { resolve } = require('path');
const EslintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
	mode: 'development',
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../', 'dist'),
		chunkFilename: '[name].js',
		publicPath: '/',
	},
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		compress: true,
		hot: true,
		port: process.env.PORT || 8443,
		server: {
			type: 'https',
			options: {
				cert: resolve(__dirname, '../', 'certs/chain.pem'),
				key: resolve(__dirname, '../', 'certs/key.pem'),
			},
		},
		client: {
			overlay: false,
		},
	},
	plugins: [
		new EslintWebpackPlugin({
			emitWarning: false,
			emitError: false,
			failOnError: false,
			failOnWarning: false,
			extensions: ['js', 'jsx', 'ts', 'tsx'],
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.LoaderOptionsPlugin({
			debug: true,
		}),
		new SvgStore({
			path: resolve(__dirname, '../', 'src/presentation/assets/svgSprite/**/*.svg'),
			fileName: 'images/svg/sprite.svg',
			inlineSvg: true,
			prefix: 'icon-',
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					'css-loader',
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							// sourceMap: isDevelopment,
							api: 'modern',
						},
						// 						options: {
						// 							implementation: require.resolve('sass'),
						// 							additionalData: (content, loaderContext) => {
						// 								// More information about available properties https://webpack.js.org/api/loaders/
						// 								// const { rootContext } = loaderContext;
						//
						// 								return `@use "sass:meta";
						// @import '~normalize.css/normalize.css';
						// @include meta.load-css('default');
						// 							${content}`;
						// 							},
						// 						},
					},
				],
			},
		],
	},
};
