import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('API_PORT');

  const swagger = new DocumentBuilder()
  .setTitle('Admin panel')
  .setDescription('Документация REST API')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('/', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(cookieParser());

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
