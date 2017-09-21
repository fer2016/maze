module.exports = {
  entry: [
    './index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2016', 'react']
        }
      },
      {
      	test: /\.svg$/,
      	use: [
      		{
				    loader: 'svg-inline-loader'
				  }  	
      	]
      },
      {
      	test: /\.gif$/,
      	use: [
      		{
				    loader: 'file-loader',
				     options: {
					     emitFile: true
					   }  
				  }  	
      	]
      }
    ]
  },
  output: {
    filename: 'bundle.js' 
  },
  devServer: {
  	historyApiFallback: true
  }
}