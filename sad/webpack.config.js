var config = {
   entry: './app/main.jsx',
   output: {
       filename: 'bundle.js',
   },
   devServer: {
       port: 8080,
       historyApiFallback: true,
      inline: true,
      port: 8081
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         }
      ]
   }
}
module.exports = config;
