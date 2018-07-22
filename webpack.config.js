'use strict';

var config = {
	watch: true,
	devtool: 'source-map',
	// mode: 'production',
	mode: 'development',
	entry: {
		main: ['./src/styles/sass/index.scss', './src/gameSrcJs/interface/interface.jsx']
	},
	output: {
		path: __dirname + '/public/resources/js/',
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: "style-loader"
			}, {
				loader: "css-loader", options: {
					sourceMap: true
				}
			}, {
				loader: "sass-loader", options: {
					sourceMap: true
				}
			}]
		}, {
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ["env", "react"]
				}
			}
		}]
	}
};

module.exports = config;