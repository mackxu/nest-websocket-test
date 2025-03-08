<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 技术点

- WebSocketGateway()
- SubscribeMessage()
- MessageBody() 管道
- new Observable() 异步返回
- 接口 OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
- **Sec-WebSocket-Key** 经过什么处理能得到 **Sec-WebSocket-Accept**
- **StreamableFile** pass either a Buffer or a Readable

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

## ReadableStream vs Readable

**ReadableStream**  
来源：Web Streams API，最初为浏览器设计，现已在 Node.js 中支持。  
用途：用于处理流数据，特别是在需要与浏览器环境兼容的场景。  
基于 Promise：使用 async/await 和 Promise 来处理数据。  
方法：提供了 getReader() 等方法，用于读取数据。  
跨平台：设计目标是跨平台兼容性，适用于浏览器和 Node.js。

下面的实现等价于`Readable.fromWeb()`

```ts
function webStreamToNodeStream(webStream: ReadableStream) {
  const nodeStream = new Readable({
    read() {},
  });
  const reader = webStream.getReader();
  const pushData = () => {
    reader.read().then(({ done, value }) => {
      if (done) {
        nodeStream.push(null);
        return;
      }
      nodeStream.push(value);
      pushData();
    });
  };
  pushData();
  return nodeStream;
}
```
