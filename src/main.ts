import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(3003);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
