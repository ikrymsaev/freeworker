import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  const globalPrefix = 'api';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix(globalPrefix);

  const swagger = new DocumentBuilder()
    .setTitle('FreeWorker')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .setBasePath(globalPrefix)
    .build();
  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(port as number);
  Logger.log(`🚀 Application is running on http://localhost:${port}/${globalPrefix}`);
}
bootstrap();
