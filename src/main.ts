import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatusSuccess } from './utils/httpStatusSuccess';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('openapi');
  app.useGlobalInterceptors(new HttpStatusSuccess()); // 全局拦截器请求成功
  await app.listen(3002);
}
bootstrap();
