const path =  require ('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: './client/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: 
      {
        rules:[
          { 
            test: /\.jsx?/,
            exclude: path.resolve(__dirname, './node_modules/'),
            use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }    
            }
          }, 
          { 
            test: /\.s[ac]ss$/i,
            
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: true
                }
              },
              { loader: 'sass-loader' }
            ]
          }
        ]
      },
      devServer: {
        hot: true,
        publicPath: path.resolve(__dirname, '/build/'),
        proxy: {
          '/': 'http://localhost:3000'
        }
      }  
};