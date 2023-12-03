import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Aprobaciones de postulados API ')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('APP_PORT');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  Logger.log(
    `Swagger docs running on http://localhost:${port}/docs`,
    'Bootstrap',
  );
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
