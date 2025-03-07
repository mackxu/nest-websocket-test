import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const PROXY_WS_TARGET = 'ws://127.0.0.1:7860';
const PROXY_HTTP_TARGET = 'http://127.0.0.1:7860';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('client');

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
