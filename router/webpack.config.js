let path=require('path');
let ExtractTextPlugin=require('extract-text-webpack-plugin');
let VueLoaderPlugin = require('vue-loader/lib/plugin');

let config={
    entry:{
        main:'./main'
    },
    output:{
        path:path.join(__dirname,'./dist'),
        publicPath:'/dist/',
        filename:'[name].js',
        chunkFilename:'[name].chunk.js'
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options:{
                    loaders:{
                        css:ExtractTextPlugin.extract({
                            use:'css-loader',
                            fallback:'vue-style-loader'
                        })
                    }
                }
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    use:'css-loader',
                    fallback:'style-loader'
                })
            },
            {
                test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader:'url-loader?limit=1024'
            }
        ]
    },
    plugins:[
        //重命名提取后的css文件
        new ExtractTextPlugin({
            filename:'[name].css',
            allChunks:true
        }),
        new VueLoaderPlugin()
    ]
};
module.exports=config;