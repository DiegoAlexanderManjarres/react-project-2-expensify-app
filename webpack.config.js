// entry -> output
const path = require('path')

const MiniCssExtractPLugin = require('mini-css-extract-plugin')

module.exports = (env) =>{ 
  const isProduction = env === 'production'
  const CSSExtract = new MiniCssExtractPLugin({ filename: 'styles.css' })
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
	 },
	 plugins: [ CSSExtract ],
    module: {
      rules:[{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },{
        test: /\.(sa|sc|c)ss$/,
        use:[
			  isProduction ? MiniCssExtractPLugin.loader : 'style-loader',
          'css-loader',
			 'sass-loader'			 
        ]
      }]
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true
    }
  }
}
