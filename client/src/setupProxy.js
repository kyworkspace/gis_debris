//프록시 설정
const createProxyMiddleware  = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/gis',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
        })
      );
      //3000번 포트로 나가는 정보의 타겟을 5000번 포트로 보낸다는 의미
};