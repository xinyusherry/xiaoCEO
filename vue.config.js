module.exports = {
    // 基本路径
    // publicPath: 'http://10.26.20.254:8203/microservice-ui/', //workingtable/
    devServer: {
        proxy: {
            '': {
                target: 'http://10.26.20.254:8203/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}