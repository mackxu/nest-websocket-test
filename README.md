<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 技术点

- WebSocketGateway()
- SubscribeMessage()
- MessageBody() 管道
- new Observable() 异步返回
- 接口 OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect

## 集成sd

依赖npm包: `http-proxy-middleware`

### 代理的资源分三种

- 静态资源
- 接口
- websocket通信

### 具体实施

前提：

1. 集成页面的路径：`/webui/`
2. sd 启动时添加参数subpath：sd-api

注意ws请求与其他请求的区别

```js
app.use(
  createProxyMiddleware({
    pathFilter: '/sd-api/queue/join',
    target: PROXY_WS_TARGET,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/sd-api': '',
    },
  }),
);

app.use(
  createProxyMiddleware({
    pathFilter: ['/webui/**', '/sd-api/**'],
    target: PROXY_HTTP_TARGET,
    changeOrigin: true,
    pathRewrite: {
      '^/webui/': '/',
      '^/sd-api': '',
    },
  }),
);
```
