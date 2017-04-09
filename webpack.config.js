module.exports = {
    context: __dirname ,
    entry: ['babel-polyfill', __dirname +'/assets/js/vendor/material/index.js'],
    output: {
        path: __dirname +'/docs/assets/js',
        filename: '[name].jss'
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
