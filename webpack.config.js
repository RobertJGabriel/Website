var webpack = require('webpack');

module.exports = {
  plugins : [
 	        new webpack.ProvidePlugin({
 	            'window.$': 'jquery',
 	            'window.JQuery': 'jquery',
              'JQuery': 'jquery'
 	        })
 	    ],
    context: __dirname ,
    entry: ['babel-polyfill', __dirname +'/assets/js/vendor/material/index.js'],
    output: {
        path: __dirname +'/docs/assets/js',
        filename: 'vendor.min.js'
    },

    module: {
        loaders: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
