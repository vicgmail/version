import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ENV } from './constants/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === ENV.DEVELOPMENT) {
    const swaggerConfig = new DocumentBuilder()
      .setDescription(`NODE_ENV = ${process.env.NODE_ENV}`)
      .addCookieAuth('Authentication')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  const serverPort = process.env.SERVER_PORT || 3000;
  await app.listen(serverPort);

  console.log('Server started at:', serverPort);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
