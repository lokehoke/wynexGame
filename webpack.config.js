'use strict';

var config = {
	watch: true,
	devtool: 'source-map',
	// mode: 'production',
	mode: 'development'
};

var style = Object.assign({}, config, {
	entry: './src/styles/sass/index.scss',
	output: {
    	path: __dirname + '/public/resources/css/',
    	filename: 'style.js'
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
		}]
	}
});

var engine = Object.assign({}, config, {
	entry: './src/gameSrcJs/engine/wEngine.js',
	output: {
		path: __dirname + '/public/resources/js/',
		filename: 'bundle.js'
	}
});

module.exports = [style, engine];