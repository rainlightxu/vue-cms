//由于webpack是基于node构建的，所以在webpack的配置文件中，任何合法的node代码都是允许的
const path = require('path')
//声明html-webpack-plugin插件的变量
const htmlWebpackPlugin = require('html-webpack-plugin')
//使用vue-loader必须引用此插件 ！！！！
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//webpack配置文件，向外导出一个对象，module.exports这是node的语法，ES6新语法是export default。
//对象包括mode，entry，output，plugins，module等属性

module.exports = {
    mode:'development', //development是开发模式，production是生产模式
    entry: path.join(__dirname,'./src/main.js'), //项目入口文件
    output:{ //项目出口文件
        path:path.join(__dirname,'./dist'),
        filename:'bundle.js',
    },
    plugins:[  //所有第三方插件的配置节点
        new htmlWebpackPlugin({ //创建html-webpack-plugin对象
            template: path.join(__dirname,'./src/index.html'),
            filename:'index.html'
        }),
        new VueLoaderPlugin() //创建vue-loader plugin对象
    ],
    module:{    //所有第三方loader模块的配置节点
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {
                test:/\.(jpg|png|bmp|jpeg|gif)$/,
                // use:['url-loader?limit=821040&name=[hash:8]-[name].[ext]'],//limit参数小于图片大小，则不进行base64编码;为了防止同名图片不能正常引用，加上hash值,注意：写在一行不生效，故写成下方格式
                loader:'url-loader',
                options:{
                    limit:1024,
                    name:'[hash:8]-[name].[ext]',
                    esModule:false
                }//esModule:false用于解决Vue中img图像src变成"[object Module]"无法正确加载的问题
            },
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:['url-loader']},
            {test:/\.js$/,use:['babel-loader'],exclude:/node_modules/},
            {test:/\.vue$/,use:['vue-loader']},
                
        ]
    }, 
    devServer:{
        disableHostCheck:true
    } 
}