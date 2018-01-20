var config = {
   entry: './app/main.jsx',
   output: {
       filename: 'bundle.js',
   },
   devServer: {
<<<<<<< HEAD
       port: 8080,
       historyApiFallback: true
=======
      inline: true,
      port: 8081
>>>>>>> 6a02799bcdd754bb5d0816bdd5f6224dee496867
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