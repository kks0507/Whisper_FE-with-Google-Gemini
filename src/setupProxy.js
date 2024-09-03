const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '', // remove base path
            },
            onProxyReq: (proxyReq, req, res) => {
                proxyReq.setHeader('Origin', 'http://localhost:3000');
            },
            onError: (err, req, res) => {
                console.error('Proxy error:', err);
                res.status(500).send('Proxy error');
            },
        })
    );
};

