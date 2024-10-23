/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const SvgStore = require('@unger1984/webpack-svgstore');
const TerserPlugin = require('terser-webpack-plugin');
const uuid = require('uuid');
const { resolve } = require('path');

module.exports = {
	mode: 'production',
	output: {
		filename: `js/[name].js?v=[chunkhash:4]`,
		path: path.resolve(__dirname, '../', 'dist'),
		chunkFilename: `js/[name].[chunkhash].js`,
		publicPath: '/',
	},
	devtool: 'source-map',
	optimization: {
		minimizer: [
			new TerserPlugin({
				// Use multi-process parallel running to improve the build speed
				// Default number of concurrent runs: os.cpus().length - 1
				// parallel: true,
				// Enable file caching
				// cache: true,
			}),
		],
		// Automatically split vendor and commons
		// https://twitter.com/wSokra/status/969633336732905474
		// https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name(module) {
						// get the name. E.g. node_modules/packageName/not/this/part.js
						// or node_modules/packageName
						const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
						const packageName = match ? match[1] : uuid();

						// npm package names are URL-safe, but some servers don't like @ symbols
						return `npm.${packageName.replace('@', '')}`;
					},
				},
			},
		},
		// Keep the runtime chunk seperated to enable long term caching
		// https://twitter.com/wSokra/status/969679223278505985
		runtimeChunk: true,
	},
	plugins: [
		new SvgStore({
			path: resolve(__dirname, '../', 'src/presentation/assets/svgSprite/**/*.svg'),
			fileName: 'images/svg/sprite.svg',
			inlineSvg: true,
			prefix: 'icon-',
			publicPath: '/',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `css/[name].[contenthash].css`,
			chunkFilename: `css/[id].[contenthash].css`,
		}),
	],
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						// options: {
						// 	implementation: require.resolve('sass'),
						// 	additionalData: (content, loaderContext) => {
						// 		// More information about available properties https://webpack.js.org/api/loaders/
						// 		const { rootContext } = loaderContext;
						//
						// 		return `
						// 	@use "sass:math";
						// 	@import "${rootContext}/src/scss/variables";
						// 	@import "${rootContext}/src/scss/mixins";
						// 	${content}`;
						// 	},
						// },
					},
				],
			},
		],
	},
};
