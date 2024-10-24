/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
require('dotenv').config();

const envs = {
	development: 'dev',
	production: 'prod',
};

const env = envs[process.env.NODE_ENV || 'development'];

module.exports = {
	entry: resolve(__dirname, '../', 'src/index.tsx'),
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
		alias: {
			data: resolve(__dirname, '../src/data'),
			domain: resolve(__dirname, '../src/domain'),
			presentation: resolve(__dirname, '../src/presentation'),
			factories: resolve(__dirname, '../src/factories'),
			utils: resolve(__dirname, '../src/utils'),
		},
		plugins: [new DirectoryNamedWebpackPlugin()],
		// fallback: {
		// 	crypto: require.resolve('crypto-browserify'),
		// 	buffer: require.resolve('buffer/'),
		// 	stream: require.resolve('stream-browserify'),
		// 	util: require.resolve('util/'),
		// 	vm: require.resolve('vm-browserify'),
		// },
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(__dirname, '../', `src/presentation/index.${env}.html`),
		}),
		new ProgressBarPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
			__VERSION__: JSON.stringify(new Date()),
			__URL_WS__: JSON.stringify(process.env.URL_WS || ''),
			__URL_HLS__: JSON.stringify(process.env.URL_HLS || ''),
			__GOOGLE_AUTH_CLIENT_ID__: JSON.stringify(process.env.GOOGLE_AUTH_CLIENT_ID || ''),
		}),
		new CopyPlugin({
			patterns: [
				{
					from: resolve(__dirname, '../', 'src/presentation/assets/static/android-chrome-192x192.png'),
					to: '',
				},
				{
					from: resolve(__dirname, '../', 'src/presentation/assets/static/android-chrome-512x512.png'),
					to: '',
				},
				{ from: resolve(__dirname, '../', 'src/presentation/assets/static/apple-touch-icon.png'), to: '' },
				{ from: resolve(__dirname, '../', 'src/presentation/assets/static/favicon.ico'), to: '' },
				{ from: resolve(__dirname, '../', 'src/presentation/assets/static/favicon-16x16.png'), to: '' },
				{ from: resolve(__dirname, '../', 'src/presentation/assets/static/favicon-32x32.png'), to: '' },
				{ from: resolve(__dirname, '../', 'src/presentation/assets/static/site.webmanifest'), to: '' },
			],
		}),
		new webpack.ContextReplacementPlugin(/moment[\\]locale$/, /en|ru/),
	],
	module: {
		rules: [
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/',
						},
					},
				],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
			},
			{
				test: /\.svg$/,
				rules: [
					{
						issuer: /\.(js|ts)$/,
						use: 'svg-sprite-loader',
					},
				],
			},
			{
				test: /\.(png|jpg|gif|mp4)$/,
				type: 'asset/resource',
				exclude: /static/,
				// use: [
				// 	{
				// 		loader: 'url-loader',
				// 		options: {
				// 			limit: 8000,
				// 			name: 'images/[hash:8]-[name].[ext]',
				// 		},
				// 	},
				// ],
			},
		],
	},
};
