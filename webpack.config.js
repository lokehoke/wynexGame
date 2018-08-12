'use strict';

const Webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith');

const mixinView = `
@mixin N {
	width: Wpx;
	margin: auto;
	height: Hpx;
	background-position: Xpx Ypx;
	background-image: url(/resources/img/I);
}`;

function templateFunction(data) {
	let mixins = data.sprites.map(sprite => {
		return mixinView
			.replace('I', data.sprites[0].image)
			.replace('N', sprite.name)
			.replace('W', sprite.width)
			.replace('H', sprite.height)
			.replace('X', sprite.offset_x)
			.replace('Y', sprite.offset_y);
	}).join('\n');

	return mixins;
}

let config = {
	watch: true,
	devtool: 'source-map',
	mode: 'development',
	entry: {
		main: [
			'babel-polyfill',
			'./src/styles/sass/index.scss',
			'./src/gameSrcJs/interface/interface.jsx'
		]
	},
	output: {
		path: __dirname + '/public/resources/js/',
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: {
					sourceMap: true
				}
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: [
						autoprefixer({
							browsers:['ie >= 8', 'last 4 version']
						})
					],
					sourceMap: true
				}
			}, {
				loader: 'sass-loader', options: {
					sourceMap: true
				}
			}]
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						'env',
						'react'
					],
					plugins: ['transform-class-properties']
				}
			}
		}, {
			test: /\.png$/,
			use: [{
				loader: 'file-loader',
					options: {
					name: 'resources/img/[name].[ext]',
					context: ''
				}
			}]
		}]
	},
	resolve: {
		modules: ['node_modules', 'spritesmith-generated']
	},
	plugins: [
		new Webpack.NoEmitOnErrorsPlugin(),
		new SpritesmithPlugin({
			src: {
				cwd: path.resolve(__dirname, 'src/img/'),
				glob: '*.png'
			},
			target: {
				image: path.resolve(__dirname, 'public/resources/img/sprite.png'),
				css: [
					[path.resolve(__dirname, 'src/styles/sprites/sprite.scss'), {
						format: 'function_based_template'
					}]
				]
			},
			customTemplates: {
				'function_based_template': templateFunction,
			},
			apiOptions: {
				cssImageRef: 'sprite.png'
			}
		})
	]
};

module.exports = config;