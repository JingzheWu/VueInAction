let webpack=require('webpack');
let HtmlWebPackPlugin=require('html-webpack-plugin');
let ExtractTextPlugin=require('extract-text-webpack-plugin');
let merge=require('webpack-merge');
let webpackBaseConfig=require('./webpack.config');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');//webpack4中废弃了webpack.optimize.UglifyJsPlugin的用法，需要自定义一个
let VueLoaderPlugin = require('vue-loader/lib/plugin');//因为在下面把webpackBaseConfig中的plugins清空了，所以这个插件也没了

//清空基本配置的插件列表
webpackBaseConfig.plugins=[];

module.exports=merge(webpackBaseConfig,{
    output:{
        publicPath:'/dist/',
        //将入口文件名重命名为带有20位hash值的唯一文件
        filename:'[name].[hash].js'
    },
    plugins:[
        new ExtractTextPlugin({
            //提取css，并重命名为带有20位hash值的唯一文件
            filename:'[name].[hash].css',
            allChunks:true
        }),
        //定义当前node环境为生产环境
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        }),
        //提取模板，并保存入口html文件
        new HtmlWebPackPlugin({
            filename:'../index_prod.html',
            template:'./index.ejs',
            inject:false
        }),
        new VueLoaderPlugin()
    ],
    //压缩js
    optimization: {
        minimizer: [
          // we specify a custom UglifyJsPlugin here to get source maps in production
          new UglifyJsPlugin({
            // cache: true,
            // parallel: true,
            uglifyOptions: {
              compress: false,
            //   ecma: 6,
            //   mangle: true
            }
            // sourceMap: true
          })
        ]
      }
});