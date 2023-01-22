import { createProxyMiddleware } from "http-proxy-middleware"



function app(){
    app.use(
        createProxyMiddleware('/home/superagent/signup',{
            target: 'https://node-server-jtym.vercel.app',
            changeOrigin: true
        })   
    )
}

export default app;