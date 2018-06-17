'use strict';

module.exports = {
	entry: {
		bundle: './resources/js/modules/index.js',
		styles: './resources/css/sass/index.scss'
	},
	output: {
		path: __dirname + "/resources/dist/",
	},
	mode: 'production',
	watch: true,
	devtool: 'source-map',
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
};