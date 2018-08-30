let path=require('path');

let config={
    entry:{
        main:'./index'
    },
    output:{
        path:path.join(__dirname,'./dist'),
        publicPath:'/dist/',
        filename:'main.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test: /\.(tpl|html)$/,
                loader: 'html-loader',
                options: {
                    attrs: false,
                    minifyCSS: false,
                    removeAttributeQuotes: false
                },
            }
        ]
    },
    plugins:[

    ],
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    }
}
module.exports=config;