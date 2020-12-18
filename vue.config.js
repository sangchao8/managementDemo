const path = require('path');
module.exports = {
   /* assetsDir:'assets',
    lintOnSave:false,*/
    /*devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            "/": {
                // 代理至线上服务器
                // target: 'http://192.168.102.125:9102',
                // target: 'http://223.112.8.106:6522',
                // target: 'http://49.4.24.18:8888',
                // target:'http://23.20.4.92:8826',
                // target:'http://23.20.4.41:8887',
                // target:'http://23.20.4.43:8887',
                // target:'http://23.20.4.55:8884',
                // target:'http://23.20.4.61:8090',
                // target:'http://23.20.4.55:8887',
                // target: 'http://172.16.7.65:9200',
                // target: 'http://172.25.10.4:9200', //东部机场生产环境
                /!* target: 'http://127.0.0.1:9200',*!/
                //target: 'http://223.112.8.106:9201',//测试
                target: 'http://srh.natapp1.cc',//史瑞豪
                changeOrigin: true,
                pathRewrite: {
                    "^/": ""
                }
            }
        },
        /!**
         * Source Maps
         *!/
     /!*   devtool: "cheap-module-eval-source-map",
        cacheBusting: true,
        cssSourceMap: true*!/
    },*/
    // 打包时不生成.map文件 避免看到源码
    productionSourceMap: false,
   /* configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',
            }
        }
    },*/
    // 部署优化
   /* configureWebpack: {
        // GZIP压缩
        plugins: [
            new CompressionPlugin({
                test: /\.js$|\.html$|\.css/, // 匹配文件
                threshold: 10240 // 对超过10k文件压缩
            })
        ]
    },*/
    //插件配置
    pluginOptions: {
        //less预处理器
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, './src/common/css/common.less')
            ]
        }
    }

}
